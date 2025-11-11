
import React from 'react';
import type { Message } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start space-x-4 p-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} max-w-xl`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isModel ? 'bg-gray-800 text-gray-200 rounded-tl-none' : 'bg-indigo-700 text-white rounded-tr-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs text-gray-400 font-semibold mb-1">Fontes:</h4>
            <ul className="flex flex-wrap gap-2">
              {message.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-gray-700 text-indigo-300 hover:bg-gray-600 hover:text-indigo-200 rounded-full px-3 py-1 transition-colors"
                  >
                    {source.title || new URL(source.uri).hostname}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {!isModel && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-gray-200" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
