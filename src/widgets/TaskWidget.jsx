import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import './TaskWidget.css';

export default function TaskWidget() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('jarvis_tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [
            { id: 1, text: 'Review K10 integration options', done: false },
            { id: 2, text: 'Prepare weekly tech report', done: true },
            { id: 3, text: 'Brainstorm UI layout', done: false }
        ];
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('jarvis_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addTask = (e) => {
        if (e.key === 'Enter' && newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
            setNewTask('');
        }
    };

    return (
        <div className="glass-panel widget task-widget animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="widget-title">Pending Tasks</h3>

            <div className="task-list">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`task-item ${task.done ? 'task-done' : ''}`}
                        onClick={() => toggleTask(task.id)}
                    >
                        {task.done ?
                            <CheckCircle2 size={18} className="task-icon done" /> :
                            <Circle size={18} className="task-icon pending" />
                        }
                        <span className="task-text">{task.text}</span>
                    </div>
                ))}
            </div>

            <div className="task-input-container">
                <Plus size={16} className="task-add-icon" />
                <input
                    type="text"
                    className="task-input"
                    placeholder="New task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={addTask}
                />
            </div>
        </div>
    );
}
