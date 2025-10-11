import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatbotWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Ciao! 👋 Come posso aiutarti?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('progetti') || msg.includes('lavori')) {
      return 'Ho lavorato su diversi progetti interessanti! Tra cui:\n\n• E-commerce Platform con React e Node.js\n• Task Management App con Vue.js\n• AI Chat Interface con integrazione OpenAI\n\nVuoi saperne di più? 🚀';
    }

    if (msg.includes('skill') || msg.includes('tecnologie') || msg.includes('competenze')) {
      return 'Le mie competenze principali includono:\n\n• Frontend: React, Vue.js, TypeScript\n• Backend: Node.js, Python\n• Database: MongoDB, PostgreSQL\n• Cloud: AWS, Docker\n\nE molto altro! 💻';
    }

    if (msg.includes('contatto') || msg.includes('email') || msg.includes('contattare')) {
      return 'Puoi contattarmi tramite:\n\n📧 Email: tuo@email.com\n💼 LinkedIn: linkedin.com/in/tuoprofilo\n💻 GitHub: github.com/tuoprofilo\n\nSono sempre aperto a nuove opportunità! 😊';
    }

    if (msg.includes('esperienza') || msg.includes('lavoro')) {
      return 'Ho 5+ anni di esperienza nello sviluppo web full-stack. Ho lavorato sia come freelance che in team per progetti enterprise. 💼';
    }

    if (msg.includes('ciao') || msg.includes('hey') || msg.includes('salve')) {
      return 'Ciao! 👋 Puoi chiedermi dei miei progetti, competenze, esperienze o come contattarmi!';
    }

    return 'Grazie per il messaggio! 🤔\n\nPuoi chiedermi informazioni su:\n• Progetti\n• Competenze\n• Esperienze\n• Contatti\n\nCosa vorresti sapere?';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = { type: 'bot', text: getBotResponse(input) };
      setMessages(prev => [...prev, botResponse]);
    }, 600);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-slate-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 border border-slate-700"
        >
          <MessageCircle className="w-6 h-6 text-slate-100" />
        </button>
      )}

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-purple-500/30">

          {/* Header */}
          <div className="bg-slate-900 p-4 rounded-t-2xl flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-3">
              <img
                src="favicon.png"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
              />
              <div>
                <h3 className="font-bold text-slate-100">Assistente AI</h3>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-slate-700 p-2 rounded-lg transition text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                  msg.type === 'user'
                    ? 'bg-slate-700 text-slate-100 rounded-br-none border border-slate-600'
                    : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrivi un messaggio..."
                className="flex-1 bg-slate-700 text-slate-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                onClick={handleSend}
                className="bg-slate-800 p-2 rounded-full hover:scale-110 transition-transform border border-slate-700"
              >
                <Send className="w-5 h-5 text-slate-100" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}