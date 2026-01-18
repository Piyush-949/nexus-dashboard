import React, { useEffect, useState } from 'react';
import './Widgets.css';

const SystemMonitor = () => {
    // Simulated values
    const [cpu, setCpu] = useState(34);
    const [ram, setRam] = useState(56);
    const [net, setNet] = useState(12);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => Math.min(100, Math.max(10, prev + (Math.random() - 0.5) * 20)));
            setRam(prev => Math.min(100, Math.max(20, prev + (Math.random() - 0.5) * 10)));
            setNet(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 40)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-panel widget-system">
            <div className="sys-row">
                <div className="sys-label"><span>CPU CORE</span><span>{Math.round(cpu)}%</span></div>
                <div className="sys-bar-bg"><div className="sys-bar-fill" style={{ width: `${cpu}%` }}></div></div>
            </div>
            <div className="sys-row">
                <div className="sys-label"><span>MEMORY</span><span>{Math.round(ram)}%</span></div>
                <div className="sys-bar-bg"><div className="sys-bar-fill" style={{ width: `${ram}%` }}></div></div>
            </div>
            <div className="sys-row">
                <div className="sys-label"><span>NETWORK</span><span>{Math.round(net)} MB/s</span></div>
                <div className="sys-bar-bg"><div className="sys-bar-fill" style={{ width: `${net}%` }}></div></div>
            </div>
        </div>
    );
};

export default SystemMonitor;
