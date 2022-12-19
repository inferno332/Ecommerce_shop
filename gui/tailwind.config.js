/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                lg: '1rem',
                xl: '1rem',
                '2xl': '2rem',
            },
        },
        extend: {
            animation: {
                slideup: 'slideup 1s ease-in-out',
                slidedown: 'slidedown 1s ease-in-out',
                slideleft: 'slideleft 1s ease-in-out',
                slideright: 'slideright 1s ease-in-out',
                wave: 'wave 1.2s linear infinite',
                slowfade: 'slowfade 2.2s ease-in-out',
                pulse: 'pulse 1s infinite;',
                wiggle: 'wiggle 2s ease-in-out infinite',
                rotateRight: 'rotateRight 0.5s',
                rotateLeft: 'rotateLeft 0.5s',
                marquee: 'marquee 15s linear infinite',
                width: 'width 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
            },
            keyframes: {
                slowfade: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                slideup: {
                    from: { opacity: 0, transform: 'translateY(25%)' },
                    to: { opacity: 1, transform: 'none' },
                },
                slidedown: {
                    from: { opacity: 0, transform: 'translateY(-25%)' },
                    to: { opacity: 1, transform: 'none' },
                },
                slideleft: {
                    from: { opacity: 0, transform: 'translateX(-20px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                slideright: {
                    from: { opacity: 0, transform: 'translateX(20px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                wave: {
                    '0%': { transform: 'scale(0)' },
                    '50%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(0)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-30deg)' },
                    '50%': { transform: 'rotate(30deg)' },
                },
                pulse: {
                    '0%': {
                        transform: 'scale(1)',
                    },
                    '70%': {
                        transform: 'scale(.9)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                    },
                },
                rotateRight: {
                    '100%': {
                        transform: 'rotate(180deg)',
                    },
                },
                rotateLeft: {
                    '100%': {
                        transform: 'rotate(-180deg)',
                    },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
        },
        fontFamily: {
            sans: ['Josefin Sans', 'sans-serif'],
            body: ['Josefin Sans', 'sans-serif'],
        }
    },
    plugins: ['tailwindcss'],
};
