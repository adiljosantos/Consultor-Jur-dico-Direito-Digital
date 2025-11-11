
import React from 'react';

const BotIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
    <path
      fillRule="evenodd"
      d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.342 1.374a3.026 3.026 0 01.628 2.302c.115.806.115 1.631 0 2.438a3.026 3.026 0 01-.628 2.302c-.512.79-1.375 1.322-2.342 1.374a49.52 49.52 0 01-5.312 0c-.967-.052-1.83-.585-2.342-1.374a3.026 3.026 0 01-.628-2.302c-.115-.806-.115-1.631 0-2.438a3.026 3.026 0 01.628-2.302c.512-.79 1.375-1.322 2.342-1.374zM12 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
      clipRule="evenodd"
    />
    <path d="M6.75 18a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" />
  </svg>
);

export default BotIcon;
