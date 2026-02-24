import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Command, Send, User, Cpu } from 'lucide-react';
import './CommandCenter.css';

export default function CommandCenter() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'k10', text: 'Hello. I am K10. How can I assist you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleMockAIResponse = (userText) => {
    setIsTyping(true);

    // Simulated AI thinking delay
    setTimeout(() => {
      const lowerText = userText.toLowerCase();
      let aiResponse = "I process your command, but my databanks are currently limited to simulation mode.";

      if (lowerText.includes('hello') || lowerText.includes('hi')) {
        aiResponse = "Greetings. All systems are operating within normal parameters.";
      } else if (lowerText.includes('weather')) {
        aiResponse = "I cannot access live weather data yet. Would you like me to simulate a forecast?";
      } else if (lowerText.includes('task')) {
        aiResponse = "I have noted your request regarding tasks, but cannot directly alter the widget yet.";
      } else if (lowerText.includes('time')) {
        aiResponse = `The current system time is ${new Date().toLocaleTimeString()}.`;
      }

      setMessages(prev => [...prev, { id: Date.now(), sender: 'k10', text: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newUserMessage = { id: Date.now(), sender: 'user', text: query.trim() };
    setMessages(prev => [...prev, newUserMessage]);
    setQuery('');

    handleMockAIResponse(newUserMessage.text);
  };

  return (
    <div className="command-center animate-fade-in">
      <div className="chat-interface glass-panel">

        <div className="chat-history">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'message-user' : 'message-k10'}`}>
              <div className="message-avatar">
                {msg.sender === 'user' ? <User size={16} /> : <Cpu size={16} className="k10-icon" />}
              </div>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message message-k10 typing-indicator">
              <div className="message-avatar"><Cpu size={16} className="k10-icon pulse-icon" /></div>
              <div className="message-bubble">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="command-panel" onSubmit={handleSubmit}>
          <div className="command-icon">
            <Command size={24} color="var(--primary)" />
          </div>
          <input
            type="text"
            className="command-input"
            placeholder="Talk to K10..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="command-actions">
            <button type="button" className="icon-btn"><Mic size={20} /></button>
            <button type="submit" className="icon-btn primary-btn"><Send size={20} /></button>
          </div>
        </form>
      </div>
    </div>
  );
}
