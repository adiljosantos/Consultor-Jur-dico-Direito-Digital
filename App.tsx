
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from './types';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ExamplePrompts from './components/ExamplePrompts';
import { getLegalAnswer } from './services/geminiService';

const App: React.FC = () => {
  const initialMessage: Message = {
    id: 'init-message',
    role: 'model',
    content: 'Olá! Sou seu assistente jurídico digital.\n\nPosso responder a perguntas sobre leis federais brasileiras e os mais recentes artigos científicos sobre direito digital. Em que posso ajudar?',
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  const handleSend = async (userInput: string) => {
    setError(null);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const { text, sources } = await getLegalAnswer(userInput);
      const modelMessage: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: text,
        sources: sources,
      };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="flex-grow overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {messages.length === 1 && !isLoading && <ExamplePrompts onSelectPrompt={handleSend} />}

          {isLoading && (
            <div className="flex items-start space-x-4 p-4 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center animate-pulse"></div>
              <div className="px-4 py-3 rounded-2xl bg-gray-800">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="p-4 text-center">
              <p className="bg-red-900/50 text-red-300 px-4 py-2 rounded-lg">{error}</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default App;
