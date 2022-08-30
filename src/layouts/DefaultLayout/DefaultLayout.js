import { Header, MusicPlayer, SlideBar } from '~/components'

function DefaultLayout({ children }) {
    return (
        <div className="relative min-h-screen">
            <div className="fixed top-0 left-0 w-w-sidebar h-full ">
                <SlideBar />
            </div>
            <div className="fixed top-0 left-w-sidebar w-w-header h-h-header z-10">
                <Header />
            </div>
            <div className="absolute top-h-header left-w-sidebar w-w-container">{children}</div>
            <div className="fixed bottom-0 left-0 w-full h-h-music-player border-t border-28">
                <MusicPlayer />
            </div>
        </div>
    )
}

export default DefaultLayout
