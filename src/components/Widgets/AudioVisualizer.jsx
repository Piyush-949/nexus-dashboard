import React, { useEffect, useRef } from 'react';
import './Widgets.css';

const AudioVisualizer = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        const bars = 30;
        const barWidth = canvas.width / bars;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < bars; i++) {
                const height = Math.random() * canvas.height;
                const x = i * barWidth;

                // Gradient fill
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, '#00f3ff');
                gradient.addColorStop(1, '#bc13fe');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - height, barWidth - 2, height);
            }

            animationId = setTimeout(() => {
                requestAnimationFrame(draw);
            }, 100); // Slower update for "retro" feel
        };

        draw();

        return () => clearTimeout(animationId);
    }, []);

    return (
        <div className="glass-panel widget-visualizer">
            <canvas ref={canvasRef} width={300} height={100} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default AudioVisualizer;
