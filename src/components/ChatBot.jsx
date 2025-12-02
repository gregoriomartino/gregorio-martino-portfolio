import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatbotWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Ciao! 👋 Come posso aiutarti? Seleziona un\'opzione qui sotto o scrivi un messaggio.' }
  ]);
  const [step, setStep] = useState('start');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const steps = {
    start: { options: ['Progetti', 'Competenze', 'Contatti', 'Esperienze'] },
    progetti: { message: 'Ecco alcuni progetti:\n• E-commerce Platform\n• AI Chat Interface\n• Portfolio Website', options: ['Torna al menu principale'] },
    competenze: { message: 'Le mie competenze:\n• Frontend: React, TypeScript, Tailwind CSS\n• Backend: Java, Node.js, Python\n• Database: Oracle, MongoDB, PostgreSQL\n• Tools: Git, Docker, AWS', options: ['Torna al menu principale'] },
    contatti: { message: 'Contattami:\n📧 martinogregorio2@gmail.com\n💼 LinkedIn: linkedin.com/in/gregorio-martino-5a42a3171/', options: ['Torna al menu principale'] },
    esperienze: { message: 'Ho 5+ anni di esperienza nello sviluppo backend e frontend.\n• Applicazioni enterprise\n• Microservizi scalabili\n• Interfacce utente moderne', options: ['Torna al menu principale'] }
  };

  const getBotResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();
    if (msg.includes('progetti') || msg.includes('progetto')) return steps.progetti.message;
    if (msg.includes('competenze') || msg.includes('skill') || msg.includes('tecnologie')) return steps.competenze.message;
    if (msg.includes('contatti') || msg.includes('email') || msg.includes('contatto')) return steps.contatti.message;
    if (msg.includes('esperienza') || msg.includes('esperienze') || msg.includes('lavoro')) return steps.esperienze.message;
    if (msg.includes('ciao') || msg.includes('hey') || msg.includes('salve')) return 'Ciao! 👋 Puoi selezionare un\'opzione o scrivere una domanda.';
    if (msg.includes('grazie') || msg.includes('thanks')) return 'Prego! 😊 C\'è altro che posso fare per te?';
    return 'Non ho capito, prova a scrivere una domanda oppure seleziona un\'opzione tra quelle disponibili.';
  };

  const simulateTyping = (message) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: message }]);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    simulateTyping(getBotResponse(userMessage));
  };

  const handleOptionClick = (choice) => {
    setMessages(prev => [...prev, { type: 'user', text: choice }]);
    if (choice === 'Torna al menu principale') {
      setStep('start');
      return;
    }
    const nextStep = choice.toLowerCase();
    setStep(nextStep);
    if (steps[nextStep]?.message) {
      simulateTyping(steps[nextStep].message);
    }
  };

  const renderOptions = () => steps[step]?.options?.map((opt, idx) => (
    <button
      key={idx}
      onClick={() => handleOptionClick(opt)}
      className="bg-black border-none shadow-none px-3 py-1 text-white rounded-md text-sm font-medium hover:text-gray-400 transition-colors"
    >
      {opt}
    </button>
  ));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Pulsante apertura chat minimal */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-black p-4 rounded-full shadow-none hover:scale-110 transition-transform duration-300 z-50 border border-gray-700 text-white"
          aria-label="Apri chat"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-black rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-800 animate-slideIn">
          {/* Header */}
          <div className="bg-black p-4 rounded-t-2xl flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-white">Assistente AI</h3>
                <p className="text-xs text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-gray-900 p-2 rounded-lg transition-colors text-white"
              aria-label="Chiudi chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                  msg.type === 'user'
                    ? 'bg-black text-white rounded-br-none border border-gray-700'
                    : 'bg-black text-white rounded-bl-none border border-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-black border border-gray-800 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 bg-black rounded-b-2xl">
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {renderOptions()}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrivi un messaggio..."
                className="flex-1 bg-black text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-black p-2 rounded-full hover:scale-110 transition-transform border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Invia messaggio"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animazioni */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .overflow-y-auto::-webkit-scrollbar { width: 6px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: #000; border-radius: 3px; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #555; }
        @media (max-width: 640px) {
          .fixed.bottom-6.right-6.w-96 { width: calc(100vw - 2rem); height: calc(100vh - 2rem); }
        }
      `}</style>
    </>
  );
}
