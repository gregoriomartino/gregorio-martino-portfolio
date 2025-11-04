import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';

export default function ChatbotWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Ciao! 👋 Come posso aiutarti?' }
  ]);
  const [input, setInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const chatRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0, dragging: false });

  // Scroll automatico
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botTyping, chatMinimized]);

  // Funzione risposta bot
  const getBotResponse = (msg) => {
    const text = msg.toLowerCase();

    if (/progetti|lavori/.test(text))
      return 'Ho lavorato su diversi progetti interessanti! 🚀<br>• <a href="https://github.com/gregoriomartino" target="_blank">E-commerce Platform con React e Node.js</a><br>• AI Chat Interface con integrazione OpenAI';
    if (/skill|tecnologie|competenze/.test(text))
      return 'Competenze principali:<br>• Frontend: React, JavaScript, TypeScript<br>• Backend: Java, Node.js, Python<br>• Database: Oracle, MongoDB, PostgreSQL<br>• Cloud: AWS, Docker';
    if (/contatto|email|contattare/.test(text))
      return 'Puoi contattarmi tramite:<br>📧 Email: <a href="mailto:martinogregorio2@gmail.com">martinogregorio2@gmail.com</a><br>💼 LinkedIn: <a href="https://linkedin.com/in/gregorio-martino-5a42a3171/" target="_blank">linkedin.com/in/gregorio-martino</a><br>💻 GitHub: <a href="https://github.com/martinogregorio2-group" target="_blank">github.com/martinogregorio2-group</a>';
    if (/esperienza|lavoro/.test(text))
      return 'Ho 5+ anni di esperienza nello sviluppo backend e anche frontend. Ho lavorato prevalentemente per progetti enterprise. 💼';
    if (/ciao|hey|salve/.test(text))
      return 'Ciao! 👋 Puoi chiedermi dei miei progetti, competenze, esperienze o come contattarmi!';
    return 'Non ho capito. Puoi chiedermi informazioni su:<br>• Progetti<br>• Competenze<br>• Esperienze<br>• Contatti';
  };

  // Invia messaggio
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setBotTyping(true);
    setTimeout(() => {
      const botMessage = { type: 'bot', text: getBotResponse(input) };
      setMessages(prev => [...prev, botMessage]);
      setBotTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Drag logic
  const handleMouseDown = (e) => {
    posRef.current.dragging = true;
    const rect = chatRef.current.getBoundingClientRect();
    posRef.current.offsetX = e.clientX - rect.left;
    posRef.current.offsetY = e.clientY - rect.top;
  };

  const handleMouseMove = (e) => {
    if (!posRef.current.dragging) return;
    posRef.current.x = e.clientX - posRef.current.offsetX;
    posRef.current.y = e.clientY - posRef.current.offsetY;

    chatRef.current.style.left = posRef.current.x + 'px';
    chatRef.current.style.top = posRef.current.y + 'px';
  };

  const handleMouseUp = () => {
    posRef.current.dragging = false;
  };

  return (
    <>
      {/* Chatbot Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-slate-800 p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 border border-slate-700"
        >
          <MessageCircle className="w-6 h-6 text-slate-100" />
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div
          ref={chatRef}
          className={`fixed w-96 h-[500px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-purple-500/30`}
          style={{ left: '20px', top: '20px', cursor: posRef.current.dragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Header */}
          <div className="bg-slate-900 p-4 rounded-t-2xl flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-3">
              <img
                src="foto.png"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
              />
              <div>
                <h3 className="font-bold text-slate-100">Assistente AI</h3>
                <p className="text-xs text-slate-400">{botTyping ? 'Sta scrivendo...' : 'Online'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChatMinimized(!chatMinimized)}
                className="hover:bg-slate-700 p-2 rounded-lg transition text-slate-100"
              >
                <Minus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:bg-slate-700 p-2 rounded-lg transition text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!chatMinimized && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                      msg.type === 'user'
                        ? 'bg-slate-700 text-slate-100 rounded-br-none border border-slate-600'
                        : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-700'
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ))}
              {botTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 text-slate-100 p-3 rounded-2xl border border-slate-700 animate-pulse">
                    ...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          {!chatMinimized && (
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
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
          )}
        </div>
      )}
    </>
  );
}
