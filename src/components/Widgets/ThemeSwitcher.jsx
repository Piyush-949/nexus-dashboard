import React from 'react';
import { Palette } from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useNexus();

    return (
        <button
            onClick={toggleTheme}
            className="glass-panel"
            style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                padding: '12px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100
            }}
            title="Switch Theme"
        >
            <Palette color={theme === 'cyan' ? '#00f3ff' : '#ff00ff'} size={24} />
        </button>
    );
};

export default ThemeSwitcher;
