import React from 'react';
import CommandCenter from './CommandCenter';
import ClockWidget from '../widgets/ClockWidget';
import TaskWidget from '../widgets/TaskWidget';
import NotesWidget from '../widgets/NotesWidget';
import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header animate-fade-in">
                <h2>Project K10 // <span className="highlight">ONLINE</span></h2>
                <div className="user-profile">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=00f0ff&color=050505" alt="User" />
                </div>
            </header>

            <main className="dashboard-main">
                <CommandCenter />

                <div className="widgets-grid">
                    <ClockWidget />
                    <TaskWidget />
                    <NotesWidget />
                </div>
            </main>
        </div>
    );
}
