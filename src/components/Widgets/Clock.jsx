import React, { useState, useEffect } from 'react';
import './Widgets.css'; // Shared styles? We'll create a specific one or shared.
// Using inline styles or a new CSS file for now to keep it isolated. We'll make a Widgets.css.

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const seconds = time.getSeconds().toString().padStart(2, '0');
    const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="glass-panel widget-clock">
            <div className="clock-main">
                <span className="time-display">{formatTime(time)}</span>
                <span className="seconds-display">{seconds}</span>
            </div>
            <div className="date-display">{dateStr}</div>
        </div>
    );
};

export default DigitalClock;
