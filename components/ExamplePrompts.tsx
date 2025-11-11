
import React from 'react';

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  "Quais são os princípios da Lei Geral de Proteção de Dados (LGPD)?",
  "O que a legislação brasileira diz sobre a validade de contratos eletrônicos?",
  "Resuma as últimas tendências em regulamentação de Inteligência Artificial no Brasil.",
  "Como funciona o direito ao esquecimento na internet segundo a justiça brasileira?",
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="p-4 animate-fade-in">
      <h3 className="text-sm font-semibold text-gray-400 mb-3 text-center">Ou tente um destes exemplos:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelectPrompt(prompt)}
            className="text-left p-3 bg-gray-800 hover:bg-gray-700/80 rounded-lg border border-gray-700 transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <p className="text-sm text-gray-200">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
