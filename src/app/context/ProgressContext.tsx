"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Session types - only 2 sessions now
export type SessionType = 'hoeren' | 'lesen';

interface SessionProgress {
  completed: boolean;
  attempts: number;
  lastAttemptAt: string | null;
}

interface DayData {
  completed: boolean;
  unlocked: boolean;
  sessions: {
    hoeren: SessionProgress;
    lesen: SessionProgress;
  };
  hearts: number;                    // 0-5 hearts per day
  heartsResetAt: string;             // ISO date string
  tomorrowHeartsUsed: boolean;       // Track if used tomorrow's hearts
}

interface Progress {
  days: Record<number, DayData>;
  streak: number;
  lastCompletedDate: string | null;
}

interface ProgressContextType {
  progress: Progress;
  attemptQuiz: (day: number, session: SessionType, passed: boolean) => boolean;
  consumeTomorrowHearts: (day: number) => boolean;
  consumeHeartForHint: (day: number) => boolean;
  unlockDay: (day: number) => void;
  getStreak: () => number;
  getHearts: (day: number) => number;
  canUseTomorrowHearts: (day: number) => boolean;
  shouldResetHearts: (dayData: DayData) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'german-progress';
const MAX_HEARTS = 5;

const createDefaultSessions = (): { hoeren: SessionProgress; lesen: SessionProgress } => ({
  hoeren: { completed: false, attempts: 0, lastAttemptAt: null },
  lesen: { completed: false, attempts: 0, lastAttemptAt: null }
});

const INITIAL_PROGRESS: Progress = {
  days: {
    1: { 
      unlocked: true, 
      completed: false, 
      sessions: createDefaultSessions(),
      hearts: MAX_HEARTS,
      heartsResetAt: new Date().toISOString(),
      tomorrowHeartsUsed: false
    }
  },
  streak: 0,
  lastCompletedDate: null,
};

// Safe localStorage getter for SSR
function getStoredProgress(): Progress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  } catch {
    return INITIAL_PROGRESS;
  }
}

// Safe localStorage setter for SSR
function setStoredProgress(progress: Progress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

// Check if it's a new day (for hearts reset)
function isNewDay(lastResetDate: string): boolean {
  const lastReset = new Date(lastResetDate);
  const now = new Date();
  return (
    lastReset.getDate() !== now.getDate() ||
    lastReset.getMonth() !== now.getMonth() ||
    lastReset.getFullYear() !== now.getFullYear()
  );
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>(INITIAL_PROGRESS);
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage after mount (client-side only)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional hydration pattern for SSR
    setProgress(getStoredProgress());
    setIsMounted(true);
  }, []);

  // Sync to localStorage whenever progress changes (after mount)
  useEffect(() => {
    if (isMounted) {
      setStoredProgress(progress);
    }
  }, [progress, isMounted]);

  // Check if hearts should be reset for a day
  const shouldResetHearts = useCallback((dayData: DayData): boolean => {
    return isNewDay(dayData.heartsResetAt);
  }, []);

  // Get current hearts for a day (with auto-reset)
  const getHearts = useCallback((day: number): number => {
    const dayData = progress.days[day];
    if (!dayData) return MAX_HEARTS;
    
    if (shouldResetHearts(dayData)) {
      return MAX_HEARTS;
    }
    return dayData.hearts;
  }, [progress.days, shouldResetHearts]);

  // Attempt a quiz - consumes 1 heart if failed
  const attemptQuiz = useCallback((day: number, session: SessionType, passed: boolean): boolean => {
    let success = false;
    
    setProgress(prev => {
      const dayData = prev.days[day] || { 
        unlocked: day === 1, 
        completed: false, 
        sessions: createDefaultSessions(),
        hearts: MAX_HEARTS,
        heartsResetAt: new Date().toISOString(),
        tomorrowHeartsUsed: false
      };

      // Check if hearts need reset
      let currentHearts = dayData.hearts;
      let heartsResetAt = dayData.heartsResetAt;
      if (isNewDay(dayData.heartsResetAt)) {
        currentHearts = MAX_HEARTS;
        heartsResetAt = new Date().toISOString();
      }

      // Check if can attempt
      if (currentHearts <= 0) {
        return prev; // Cannot attempt
      }

      // Update session progress
      const newSessions = { ...dayData.sessions };
      newSessions[session] = {
        completed: passed || dayData.sessions[session].completed,
        attempts: dayData.sessions[session].attempts + 1,
        lastAttemptAt: new Date().toISOString()
      };

      // Deduct heart if failed
      let newHearts = currentHearts;
      if (!passed) {
        newHearts = Math.max(0, currentHearts - 1);
      }

      // Check if day is completed (both sessions passed)
      const isDayCompleted = newSessions.hoeren.completed && newSessions.lesen.completed;

      const newProgress = {
        ...prev,
        days: {
          ...prev.days,
          [day]: {
            ...dayData,
            sessions: newSessions,
            completed: isDayCompleted,
            hearts: newHearts,
            heartsResetAt
          }
        }
      };

      // Handle streak and unlock next day
      if (isDayCompleted && !dayData.completed) {
        const today = new Date().toISOString().split('T')[0];
        if (prev.lastCompletedDate !== today) {
          newProgress.streak = (prev.streak || 0) + 1;
          newProgress.lastCompletedDate = today;
        }
        
        // Auto unlock next day
        const nextDay = day + 1;
        if (!newProgress.days[nextDay]) {
          newProgress.days[nextDay] = { 
            unlocked: true, 
            completed: false, 
            sessions: createDefaultSessions(),
            hearts: MAX_HEARTS,
            heartsResetAt: new Date().toISOString(),
            tomorrowHeartsUsed: false
          };
        } else {
          newProgress.days[nextDay].unlocked = true;
        }
      }

      success = true;
      return newProgress;
    });

    return success;
  }, []);

  // Check if can use tomorrow's hearts
  const canUseTomorrowHearts = useCallback((day: number): boolean => {
    const dayData = progress.days[day];
    if (!dayData) return false;
    
    // Can't use if already used
    if (dayData.tomorrowHeartsUsed) return false;
    
    // Check if there's a next day
    const nextDay = day + 1;
    if (nextDay > 14) return false; // Max 14 days
    
    return true;
  }, [progress.days]);

  // Use tomorrow's hearts
  const consumeTomorrowHearts = useCallback((day: number): boolean => {
    let success = false;
    
    setProgress(prev => {
      const dayData = prev.days[day];
      if (!dayData) return prev;
      
      if (dayData.tomorrowHeartsUsed) return prev;
      
      const nextDay = day + 1;
      const nextDayData = prev.days[nextDay];
      
      // If next day exists and has hearts, deduct from it
      if (nextDayData && nextDayData.hearts > 0) {
        const newProgress = {
          ...prev,
          days: {
            ...prev.days,
            [day]: {
              ...dayData,
              hearts: MAX_HEARTS,
              tomorrowHeartsUsed: true
            },
            [nextDay]: {
              ...nextDayData,
              hearts: Math.max(0, nextDayData.hearts - MAX_HEARTS)
            }
          }
        };
        success = true;
        return newProgress;
      }
      
      return prev;
    });
    
    return success;
  }, []);

  // Consume 1 heart for hint/text reveal
  const consumeHeartForHint = useCallback((day: number): boolean => {
    let success = false;
    
    setProgress(prev => {
      const dayData = prev.days[day];
      if (!dayData) return prev;
      
      // Check if hearts need reset
      let currentHearts = dayData.hearts;
      if (isNewDay(dayData.heartsResetAt)) {
        currentHearts = MAX_HEARTS;
      }
      
      // Check if can consume
      if (currentHearts <= 0) {
        return prev;
      }
      
      success = true;
      return {
        ...prev,
        days: {
          ...prev.days,
          [day]: {
            ...dayData,
            hearts: currentHearts - 1
          }
        }
      };
    });
    
    return success;
  }, []);

  const unlockDay = useCallback((day: number) => {
    setProgress(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: prev.days[day] 
          ? { ...prev.days[day], unlocked: true } 
          : { 
              unlocked: true, 
              completed: false, 
              sessions: createDefaultSessions(),
              hearts: MAX_HEARTS,
              heartsResetAt: new Date().toISOString(),
              tomorrowHeartsUsed: false
            }
      }
    }));
  }, []);

  const getStreak = useCallback(() => progress.streak, [progress.streak]);

  return (
    <ProgressContext.Provider value={{ 
      progress, 
      attemptQuiz, 
      consumeTomorrowHearts,
      consumeHeartForHint,
      unlockDay,
      getStreak,
      getHearts,
      canUseTomorrowHearts,
      shouldResetHearts
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
