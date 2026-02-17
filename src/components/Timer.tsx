"use client";

import { useEffect, useState } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export default function Timer({
  initialMinutes,
  onTimeUp,
  isPaused = false,
}: TimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);
  const [isDanger, setIsDanger] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, onTimeUp]);

  useEffect(() => {
    // Update warning states
    setIsWarning(seconds <= 300 && seconds > 60); // < 5 minutes
    setIsDanger(seconds <= 60); // < 1 minute
  }, [seconds]);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getContainerClass = () => {
    if (isDanger) {
      return "bg-red-100 border-red-300 text-red-700 animate-pulse";
    }
    if (isWarning) {
      return "bg-yellow-100 border-yellow-300 text-yellow-700";
    }
    return "bg-white border-gray-200 text-gray-700";
  };

  const getProgressPercentage = () => {
    const totalSeconds = initialMinutes * 60;
    return (seconds / totalSeconds) * 100;
  };

  return (
    <div
      className={`rounded-xl border-2 p-3 transition-all ${getContainerClass()}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="font-black text-xl font-mono">
            {formatTime(seconds)}
          </span>
        </div>
        {(isWarning || isDanger) && (
          <div className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold">
              {isDanger ? "< 1 menit!" : "< 5 menit"}
            </span>
          </div>
        )}
      </div>
      {/* Progress Bar */}
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isDanger ? "bg-red-500" : isWarning ? "bg-yellow-500" : "bg-de-red"
          }`}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
    </div>
  );
}
