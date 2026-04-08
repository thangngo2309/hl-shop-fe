import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function Button({ variant = "primary", children, ...props}: ButtonProps) {
    const variants = {
        primary:'mt-2 py-2.5 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        secondary:'mt-2 py-2.5 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        danger:'mt-2 py-2.5 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
    }

    return (
        <button
            className={`${variants[variant]}`}
            {...props}
        >
            {children}
        </button>
    )
}
