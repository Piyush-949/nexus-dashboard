import React, { createContext, useState, useContext, useEffect } from 'react';

const NexusContext = createContext();

export const useNexus = () => useContext(NexusContext);

export const NexusProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState('cyan');

    // Pomodoro State
    const [focusActive, setFocusActive] = useState(false);

    // Global Actions
    const toggleTheme = () => {
        setTheme(prev => prev === 'cyan' ? 'purple' : 'cyan');
    };

    const toggleFocus = (state) => {
        if (state !== undefined) setFocusActive(state);
        else setFocusActive(prev => !prev);
    };

    // Apply Theme Side-Effect
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'cyan') {
            root.style.setProperty('--primary', '#00f3ff');
            root.style.setProperty('--primary-glow', 'rgba(0, 243, 255, 0.5)');
            root.style.setProperty('--secondary', '#bc13fe');
            root.style.setProperty('--secondary-glow', 'rgba(188, 19, 254, 0.5)');
        } else {
            root.style.setProperty('--primary', '#ff00ff');
            root.style.setProperty('--primary-glow', 'rgba(255, 0, 255, 0.5)');
            root.style.setProperty('--secondary', '#00f3ff');
            root.style.setProperty('--secondary-glow', 'rgba(0, 243, 255, 0.5)');
        }
    }, [theme]);

    return (
        <NexusContext.Provider value={{
            theme, toggleTheme,
            focusActive, toggleFocus
        }}>
            {children}
        </NexusContext.Provider>
    );
};
