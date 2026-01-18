import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import './Widgets.css';

const NEWS_HEADLINES = [
    "NEURAL LINK V5.0 RELEASES TO PUBLIC BETA...",
    "CRYPTO MARKETS SURGE AS DECENTRALIZED AI TAKES OVER...",
    "SPACEX LAUNCHES NEW QUANTUM SATELLITE NETWORK...",
    "REACT 25: NOW WITH TELEPATHIC STATE MANAGEMENT...",
    "CYBER SECURITY ALERT: NEW ZERO-DAY EXPLOIT FOUND IN SMART FRIDGES...",
    "OPENAI ANNOUNCES GPT-6: 'IT WRITES CODE BEFORE YOU THINK IT'..."
];

const NewsTicker = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const animation = setInterval(() => {
            setOffset(prev => prev - 1);
        }, 50);

        return () => clearInterval(animation);
    }, []);

    return (
        <div className="glass-panel widget-news">
            <div className="news-label">
                <Radio size={16} className="pulse-icon" />
                <span>CYBER-STREAM</span>
            </div>
            <div className="news-content">
                <div
                    className="news-track"
                    style={{ transform: `translateX(${offset}px)` }}
                >
                    {NEWS_HEADLINES.join('  +++  ')}  +++  {NEWS_HEADLINES.join('  +++  ')}
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
