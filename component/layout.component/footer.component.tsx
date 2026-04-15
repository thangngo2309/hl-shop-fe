import React from 'react';
import { Circle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={"border-t border-gray-200 bg-white px-4 py-4 shadow-inner sm:px-6 sm:py-4"}>
      <div className={"mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-gray-600 sm:flex-row sm:text-sm"}>
        <div className={"flex items-center gap-2"}>
          <Circle className={"h-3 w-3 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 fill-current text-transparent sm:h-4 sm:w-4"} />
          <p>© {currentYear} HL Shop. All rights reserved.</p>
        </div>

        <div className={"flex gap-4 sm:gap-6"}>
          <a href="#" className={"transition-colors hover:text-indigo-600 hover:underline"}>Privacy</a>
          <a href="#" className={"transition-colors hover:text-indigo-600 hover:underline"}>Terms</a>
          <a href="#" className={"transition-colors hover:text-indigo-600 hover:underline"}>Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
