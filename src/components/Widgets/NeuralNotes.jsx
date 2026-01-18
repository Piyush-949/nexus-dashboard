import React, { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';
import './Widgets.css';

const NeuralNotes = () => {
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem('nexus_neural_note');
        if (savedNote) setNote(savedNote);
    }, []);

    const handleSave = () => {
        localStorage.setItem('nexus_neural_note', note);
        // Visual feedback could go here
    };

    const handleClear = () => {
        setNote('');
        localStorage.removeItem('nexus_neural_note');
    };

    return (
        <div className="glass-panel widget-notes">
            <div className="notes-header">
                <span>NEURAL NOTES</span>
                <div className="notes-actions">
                    <button onClick={handleSave} className="icon-btn"><Save size={18} /></button>
                    <button onClick={handleClear} className="icon-btn"><Trash2 size={18} /></button>
                </div>
            </div>
            <textarea
                className="notes-area"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Initialize thought stream..."
            />
        </div>
    );
};

export default NeuralNotes;
