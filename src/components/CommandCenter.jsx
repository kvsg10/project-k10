import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Command, Send, User, Cpu } from 'lucide-react';
import OpenAI from 'openai';
import './CommandCenter.css';

// Initialize OpenAI (Replace with actual env variable when deployed)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "dummy_key";
const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side Vite usage
});

export default function CommandCenter() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'k10', text: 'Hello. I am K10, powered by OpenAI. How can I assist you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOpenAIResponse = async (userText) => {
    setIsTyping(true);

    try {
      if (API_KEY === "dummy_key" || !API_KEY) {
        throw new Error("Missing OpenAI API Key. Please add VITE_OPENAI_API_KEY to your .env.local file.");
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are K10, an advanced, highly capable AI assistant operating a futuristic dashboard for the user. Keep your responses concise, helpful, and slightly professional/robotic but friendly." },
          { role: "user", content: userText }
        ],
      });

      const text = response.choices[0].message.content;
      setMessages(prev => [...prev, { id: Date.now(), sender: 'k10', text: text }]);
    } catch (error) {
      console.error("OpenAI API Error:", error);
      let errorMsg = `I encountered an error connecting to my neural network: ${error.message}`;
      if (error.message.includes("API code") || error.message.includes("API key")) {
        errorMsg = "My connection to the OpenAI API is offline. Please configure the VITE_OPENAI_API_KEY environment variable.";
      }
      setMessages(prev => [...prev, { id: Date.now(), sender: 'k10', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newUserMessage = { id: Date.now(), sender: 'user', text: query.trim() };
    setMessages(prev => [...prev, newUserMessage]);
    setQuery('');

    handleOpenAIResponse(newUserMessage.text);
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
