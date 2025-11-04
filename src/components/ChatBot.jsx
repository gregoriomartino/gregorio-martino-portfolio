import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatbotWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Ciao! 👋 Come posso aiutarti? Seleziona un’opzione qui sotto.' }
  ]);

  const [history, setHistory] = useState(['start']); // stack degli step
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentStep = () => history[history.length - 1];

  // Dizionario dei messaggi e opzioni per ogni step
  const steps = {
    start: {
      message: 'Seleziona un’opzione:',
      options: ['Progetti', 'Competenze', 'Contatti', 'Esperienze']
    },
    projects: {
      message: 'Ecco alcuni progetti su cui ho lavorato:\n• E-commerce Platform\n• AI Chat Interface\nVuoi tornare al menu principale?',
      options: ['Torna al menu principale']
    },
    skills: {
      message: 'Le mie competenze principali sono:\n• Frontend: React, TypeScript\n• Backend: Java, Node.js, Python\n• Database: Oracle, MongoDB, PostgreSQL\nVuoi tornare al menu principale?',
      options: ['Torna al menu principale']
    },
    contact: {
      message: 'Puoi contattarmi tramite:\n📧 Email: martinogregorio2@gmail.com\n💼 LinkedIn: linkedin.com/in/gregorio-martino-5a42a3171/\nVuoi tornare al menu principale?',
      options: ['Torna al menu principale']
    },
    experience: {
      message: 'Ho 5+ anni di esperienza nello sviluppo, prevalentemente backend ma anche frontend.\nVuoi tornare al menu principale?',
      options: ['Torna al menu principale']
    }
  };

  const handleUserChoice = (choice) => {
    const currentStep = getCurrentStep();

    // Aggiungi messaggio dell'utente
    setMessages(prev => [...prev, { type: 'user', text: choice }]);

    let nextStep = currentStep;

    if (choice === 'Torna al menu principale') {
      nextStep = 'start';
      setHistory(prev => [...prev, nextStep]);
    } else {
      nextStep = choice.toLowerCase();
      if (!steps[nextStep]) nextStep = currentStep; // fallback
      setHistory(prev => [...prev, nextStep]);
    }

    // Aggiungi risposta del bot
    setMessages(prev => [...prev, { type: 'bot', text: steps[nextStep].message }]);
  };

  const renderOptions = () => {
    const currentStep = getCurrentStep();
    return steps[currentStep].options.map((opt, idx) => (
      <button
        key={idx}
        onClick={() => handleUserChoice(opt)}
        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-full"
      >
        {opt}
      </button>
    ));
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
                src="foto.png"
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

          {/* Options / Buttons */}
          <div className="p-4 border-t border-slate-700 flex flex-wrap gap-2 justify-center">
            {renderOptions()}
          </div>
        </div>
      )}
    </>
  );
}
