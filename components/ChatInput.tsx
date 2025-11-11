
import React, { useState } from 'react';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-3xl mx-auto flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta jurídica..."
          disabled={isLoading}
          className="flex-grow bg-gray-800 border border-gray-600 rounded-full py-3 px-5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow disabled:opacity-50"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
