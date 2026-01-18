import React from 'react';
import { Github, Youtube, Code, MessageSquare } from 'lucide-react';
import './Widgets.css';

const QuickLinks = () => {
    const links = [
        { name: 'GitHub', icon: <Github size={32} />, url: 'https://github.com' },
        { name: 'YouTube', icon: <Youtube size={32} />, url: 'https://youtube.com' },
        { name: 'Dev', icon: <Code size={32} />, url: 'https://dev.to' },
        { name: 'Chat', icon: <MessageSquare size={32} />, url: 'https://openai.com' },
    ];

    return (
        <div className="glass-panel widget-links">
            {links.map((link) => (
                <a key={link.name} href={link.url} className="link-btn" target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    <span>{link.name}</span>
                </a>
            ))}
        </div>
    );
};

export default QuickLinks;
