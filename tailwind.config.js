/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                active: 'var(--active-color)',
                'rgba-0-05': 'var(--rgba-0-05-color)',
                'icon-59': 'var(--icon-59-color)',
                'icon-B2': 'var(--icon-B2-color)',
                'icon-verified': 'var(--icon-verified-color)',
                28: 'var(--bg-28-color)',
                38: 'var(--bg-38-color)',
                88: 'var(--bg-88-color)',
            },
            textColor: {
                '8A': 'var(--8A-color)',
            },
            backgroundColor: {
                '0A': 'var(--bg-0A-color)',
                18: 'var(--bg-18-color)',
                // 28: 'var(--bg-28-color)',
                58: 'var(--bg-58-color)',
                '1C': 'var(--bg-1C-color)',
                '2C': 'var(--bg-2C-color)',
                'play-btn': 'var(--bg-play-btn-color)',
            },
            backgroundImage: {
                'header-content': 'linear-gradient(transparent 0, rgba(0,0,0,0.5) 100%)',
                'middle-content': 'linear-gradient(rgba(0,0,0,0.6) 0, var(--bg-18-color) 100%)',
                music: "url('/src/assets/images/music.jpg')",
            },
            spacing: {
                'w-sidebar': 'var(--w-sidebar)',
                'w-header': 'var(--w-header)',
                'w-container': 'var(--w-container)',
                'w-music-player-list-song': 'var(--w-music-player-list-song)',

                'h-header': 'var(--h-header)',
                'h-music-player': 'var(--h-music-player)',
                'h-container': 'var(--h-container)',
                'h-header-content': 'var(--h-header-content)',
                'h-bg-header-content': 'var(--h-bg-header-content)',
                'h-bg-middle-content': 'var(--h-bg-middle-content)',
                'h-bg-body-content': 'var(--h-bg-body-content)',
                'h-action-playlist': 'var(--h-action-playlist)',
                'h-header-table': 'var(--h-header-table)',
                'h-music-player-list-song': 'var(--h-music-player-list-song)',
                't-music-player-list-song': 'var(--t-music-player-list-song)',
                'l-music-player-list-song': 'var(--l-music-player-list-song)',
                'spacing-hidden-music-player-list-song': 'var(--spacing-hidden-music-player-list-song)',
            },
            width: {},
            height: {
                70: '17.5rem',
                140: '35rem',
            },
            animation: {
                'show-slow': 'show-slow 0.5s linear',
            },
            keyframes: {
                'show-slow': {
                    '0%': {
                        opacity: 0,
                    },
                    '1000%': {
                        opacity: 1,
                    },
                },
            },
        },
    },
    plugins: [],
}
