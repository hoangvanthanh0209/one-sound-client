/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                'bg-primary': 'var(--bg-primary-color)',
                active: 'var(--active-color)',
                'rgba-0-03': 'var(--rgba-0-03-color)',
                'rgba-0-05': 'var(--rgba-0-05-color)',
                'rgba-0-005': 'var(--rgba-0-005-color)',
                'rgba-0-07': 'var(--rgba-0-07-color)',
                // 'icon-59': 'var(--icon-59-color)',
                // 'icon-B2': 'var(--icon-B2-color)',
                'icon-verified': 'var(--icon-verified-color)',
                line: 'var(--line-color)',
                // 18: 'var(--bg-18-color)',
                // 28: 'var(--bg-28-color)',
                // 38: 'var(--bg-38-color)',
                // 88: 'var(--bg-88-color)',
            },
            textColor: {
                // '8A': 'var(--8A-color)',
            },
            backgroundColor: {
                // '0A': 'var(--bg-0A-color)',
                // 58: 'var(--bg-58-color)',
                // '1C': 'var(--bg-1C-color)',
                // '2C': 'var(--bg-2C-color)',
                'play-btn': 'var(--bg-play-btn-color)',
            },
            backgroundImage: {
                'header-content': 'linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%)',
                'middle-content': 'linear-gradient(rgba(0, 0, 0, 0.6) 0, #181818 100%)',
                music: "url('/src/assets/images/music.jpg')",
            },
            spacing: {
                // 'w-sidebar': 'var(--w-sidebar)',
                // 'w-header': 'var(--w-header)',
                // 'w-container': 'var(--w-container)',

                // 'h-header': 'var(--h-header)',
                // 'h-music-player': 'var(--h-music-player)',
                // 'h-header-content': 'var(--h-header-content)',
                // 'h-bg-header-content': 'var(--h-bg-header-content)',
                // 'h-bg-middle-content': 'var(--h-bg-middle-content)',
                // 'h-bg-body-content': 'var(--h-bg-body-content)',
                // 'h-action-playlist': 'var(--h-action-playlist)',
                // 'h-header-table': 'var(--h-header-table)',

                'w-header': 'var(--w-header)',
                'h-header': 'var(--h-header)',
                'w-sidebar': 'var(--w-sidebar)',
                'h-sidebar': 'var(--h-sidebar)',
                'h-music-player': 'var(--h-music-player)',
                'spacing-hidden-music-player-list-song': 'var(--spacing-hidden-music-player-list-song)',
                'w-music-player-list-song': 'var(--w-music-player-list-song)',
                'h-music-player-list-song': 'var(--h-music-player-list-song)',
                't-music-player-list-song': 'var(--t-music-player-list-song)',
                'l-music-player-list-song': 'var(--l-music-player-list-song)',
                'h-header-content': 'var(--h-header-content)',
                'h-content': 'var(--h-content)',
                'h-bg-header-content': 'var(--h-bg-header-content)',
                'h-bg-middle-content': 'var(--h-bg-middle-content)',
                'h-action-playlist': 'var(--h-action-playlist)',
                'h-bg-body-content': 'var(--h-bg-body-content)',
                'h-header-table': 'var(--h-header-table)',
            },
            width: {},
            minHeight: { container: 'var(--min-h-container)' },
            height: {
                70: '17.5rem',
                140: '35rem',
            },
            maxHeight: {},
            zIndex: {
                1: '1',
                2: '2',
                3: '3',
            },
            animation: {
                'show-slow': 'show-slow 0.5s linear',
                'modal-fade-in': 'modalFadeIn ease .5s',
            },
            keyframes: {
                'show-slow': {
                    '0%': {
                        opacity: 0,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
                modalFadeIn: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(-140px)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
}
