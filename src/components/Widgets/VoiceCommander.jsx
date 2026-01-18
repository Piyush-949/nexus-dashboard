import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useNexus } from '../../context/NexusContext';
import './Widgets.css';

const VoiceCommander = () => {
    const { toggleTheme, toggleFocus } = useNexus();
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const tempRecognition = new window.webkitSpeechRecognition();
            tempRecognition.continuous = true;
            tempRecognition.interimResults = false;
            tempRecognition.lang = 'en-US';

            tempRecognition.onresult = (event) => {
                const last = event.results.length - 1;
                const text = event.results[last][0].transcript.trim().toLowerCase();
                setTranscript(text);
                processCommand(text);
            };

            tempRecognition.onend = () => {
                // Auto-restart if we want continuous listening, 
                // but for now let's make it toggleable to avoid noise.
                setListening(false);
            };

            setRecognition(tempRecognition);
        } else {
            console.warn("Speech Recognition not supported in this browser.");
        }
    }, []);

    const processCommand = (cmd) => {
        // Simple command matching
        if (cmd.includes('switch theme') || cmd.includes('change color')) {
            toggleTheme();
        }
        if (cmd.includes('start focus') || cmd.includes('focus mode')) {
            toggleFocus(true);
        }
        if (cmd.includes('stop focus') || cmd.includes('end focus')) {
            toggleFocus(false);
        }

        // Clear transcript after a delay
        setTimeout(() => setTranscript(''), 2000);
    };

    const toggleListening = () => {
        if (!recognition) return;
        if (listening) {
            recognition.stop();
            setListening(false);
        } else {
            recognition.start();
            setListening(true);
        }
    };

    return (
        <div className={`glass-panel widget-voice ${listening ? 'listening' : ''}`}>
            <div className="voice-header">
                <span className="voice-label">VOICE UPLINK</span>
                <button onClick={toggleListening} className={`mic-btn ${listening ? 'active' : ''}`}>
                    {listening ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
            </div>
            <div className="voice-status">
                {listening ? (transcript || "LISTENING...") : "STANDBY"}
            </div>
            {listening && <div className="voice-waves">
                <span></span><span></span><span></span><span></span>
            </div>}
        </div>
    );
};

export default VoiceCommander;
