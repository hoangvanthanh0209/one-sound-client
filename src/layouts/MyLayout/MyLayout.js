import { FaSpotify } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { DashBoard, Header, MusicPlayer, SlideBar } from '~/components'

import config from '~/config'

function MyLayout({ children }) {
    return (
        <>
            <div className="fixed top-0 left-w-sidebar h-h-header w-w-header z-3">
                <Header />
            </div>
            <div className="fixed top-0 left-0 w-w-sidebar h-h-sidebar">
                <SlideBar />
            </div>
            <div className="fixed bottom-0 left-0 h-h-music-player w-full">
                <MusicPlayer />
            </div>
            <div className="pl-w-sidebar pb-h-music-player z-3">
                <div className="pt-h-header min-h-container">{children}</div>
            </div>
        </>
    )
}

export default MyLayout
