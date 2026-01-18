import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain } from 'lucide-react';
import { useNexus } from '../../context/NexusContext';
import './Widgets.css';

const PomodoroTimer = () => {
    const { focusActive, toggleFocus } = useNexus();
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [mode, setMode] = useState('FOCUS');

    // Sync context state with local timer state if needed
    // For simplicity, we let context drive the "active" state

    useEffect(() => {
        let interval = null;
        if (focusActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            toggleFocus(false); // Stop globally
            // Sound here
        }
        return () => clearInterval(interval);
    }, [focusActive, timeLeft, toggleFocus]);

    const handleToggle = () => toggleFocus();

    const resetTimer = () => {
        toggleFocus(false);
        setTimeLeft(mode === 'FOCUS' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`glass-panel widget-pomodoro ${focusActive ? 'active-focus' : ''}`}>
            <div className="pomodoro-header">
                <Brain size={18} color={focusActive ? "var(--secondary)" : "var(--text-dim)"} />
                <span>{mode} PROTOCOL</span>
            </div>

            <div className="timer-display">
                {formatTime(timeLeft)}
            </div>

            <div className="timer-controls">
                <button onClick={handleToggle} className="icon-btn-large">
                    {focusActive ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={resetTimer} className="icon-btn-large">
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
