import { ButtonProps } from "@/model/button.model";

export function Button({ variant = "primary", children, ...props }: ButtonProps) {
    const variants = {
        primary: 'mt-2 py-2.5 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        secondary: 'mt-2 py-2.5 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        danger: 'mt-2 py-2.5 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        success: 'mt-2 py-2.5 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        warning: 'mt-2 py-2.5 rounded-lg bg-yellow-700 text-white font-semibold hover:bg-yellow-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        info: 'mt-2 py-2.5 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
        error: 'mt-2 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full',
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
