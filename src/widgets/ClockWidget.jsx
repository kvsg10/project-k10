import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MapPin } from 'lucide-react';
import './ClockWidget.css';

export default function ClockWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="glass-panel widget clock-widget animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="clock-location">
                <MapPin size={14} className="location-icon" />
                Costa Rica
            </div>
            <div className="clock-time">
                {format(time, 'HH:mm')}
            </div>
            <div className="clock-date">
                {format(time, 'EEEE, MMMM do')}
            </div>
            <div className="clock-pulse-container">
                <div className="clock-pulse"></div>
            </div>
        </div>
    );
}
