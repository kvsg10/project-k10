import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import './NotesWidget.css';

export default function NotesWidget() {
    const [note, setNote] = useState(() => {
        return localStorage.getItem('jarvis_scratchpad_note') || '';
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        localStorage.setItem('jarvis_scratchpad_note', note);
    }, [note]);

    const handleSave = () => {
        localStorage.setItem('jarvis_scratchpad_note', note);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="glass-panel widget notes-widget animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="widget-header">
                <h3 className="widget-title"><FileText size={20} className="header-icon" /> Scratchpad</h3>
                <button className="icon-btn save-btn" onClick={handleSave} title="Save Note">
                    <Save size={18} className={saved ? 'saved-icon' : ''} />
                </button>
            </div>

            <textarea
                className="notes-textarea"
                placeholder="Type a quick note or code snippet here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            {saved && <span className="save-indicator">Saved to memory</span>}
        </div>
    );
}
