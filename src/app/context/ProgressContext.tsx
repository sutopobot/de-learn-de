"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from 'react';

interface SessionProgress {
  hoeren: boolean;
  lesen: boolean;
  schreiben: boolean;
  sprechen: boolean;
}

interface DayData {
  completed: boolean;
  unlocked: boolean;
  sessions: SessionProgress;
}

interface Progress {
  days: Record<number, DayData>;
  streak: number;
  lastCompletedDate: string | null;
}

interface ProgressContextType {
  progress: Progress;
  updateSession: (day: number, session: keyof SessionProgress, completed: boolean) => void;
  unlockDay: (day: number) => void;
  getStreak: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'german-progress';

const INITIAL_PROGRESS: Progress = {
  days: {
    1: { unlocked: true, completed: false, sessions: { hoeren: false, lesen: false, schreiben: false, sprechen: false } }
  },
  streak: 0,
  lastCompletedDate: null,
};

function getSavedProgress(): Progress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
}

function subscribe(callback: () => void) {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const progress = useSyncExternalStore(
    subscribe,
    getSavedProgress,
    () => INITIAL_PROGRESS
  );

  const setProgress = useCallback((newProgress: Progress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    // Dispatch storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  }, []);

  const updateSession = useCallback((day: number, session: keyof SessionProgress, completed: boolean) => {
    const currentProgress = getSavedProgress();
    const dayData = currentProgress.days[day] || { unlocked: false, completed: false, sessions: { hoeren: false, lesen: false, schreiben: false, sprechen: false } };
    const newSessions = { ...dayData.sessions, [session]: completed };
    
    const isDayCompleted = Object.values(newSessions).every(s => s === true);
    
    const newProgress = {
      ...currentProgress,
      days: {
        ...currentProgress.days,
        [day]: { ...dayData, sessions: newSessions, completed: isDayCompleted }
      }
    };

    // Handle streak if day just completed
    if (isDayCompleted && !dayData.completed) {
      const today = new Date().toISOString().split('T')[0];
      if (currentProgress.lastCompletedDate !== today) {
        newProgress.streak = (currentProgress.streak || 0) + 1;
        newProgress.lastCompletedDate = today;
      }
      
      // Auto unlock next day
      const nextDay = day + 1;
      if (!newProgress.days[nextDay]) {
        newProgress.days[nextDay] = { 
          unlocked: true, 
          completed: false, 
          sessions: { hoeren: false, lesen: false, schreiben: false, sprechen: false } 
        };
      } else {
        newProgress.days[nextDay].unlocked = true;
      }
    }

    setProgress(newProgress);
  }, [setProgress]);

  const unlockDay = useCallback((day: number) => {
    const currentProgress = getSavedProgress();
    const newProgress = {
      ...currentProgress,
      days: {
        ...currentProgress.days,
        [day]: currentProgress.days[day] 
          ? { ...currentProgress.days[day], unlocked: true } 
          : { unlocked: true, completed: false, sessions: { hoeren: false, lesen: false, schreiben: false, sprechen: false } }
      }
    };
    setProgress(newProgress);
  }, [setProgress]);

  const getStreak = useCallback(() => progress.streak, [progress.streak]);

  return (
    <ProgressContext.Provider value={{ progress, updateSession, unlockDay, getStreak }}>
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
