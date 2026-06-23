'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! Welcome to Spark Professional Services. How can we assist you with your electrical engineering needs today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Generate a random session ID when the component loads
    setSessionId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://vertx-n8n-host102938.up.railway.app/webhook/599c8ff7-6fdf-4891-b762-8444de615ea2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, sessionId })
      });

      if (response.ok) {
        const data = await response.json();
        const botReply = data.response || data.message || "Thank you. We will get back to you shortly.";
        setMessages(prev => [...prev, { text: botReply, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I couldn't process that right now. Please try again.", isBot: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Network error. Please try again.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="chat-window"
          >
            <div className="chat-header">
              <MessageSquare size={24} />
              <div>
                <h4>Spark Assistant</h4>
                <p>Typically replies in minutes</p>
              </div>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="chat-message bot">
                  Typing...
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="chat-input-area">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit" disabled={isLoading}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
}
