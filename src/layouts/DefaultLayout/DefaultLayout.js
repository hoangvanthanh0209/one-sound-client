import { FaTimes } from 'react-icons/fa'
import { Header, Modal, MusicPlayer, SlideBar } from '~/components'

function DefaultLayout({ children }) {
    return (
        // <div className="relative min-h-screen">
        //     <div className="fixed top-0 left-0 w-w-sidebar h-full ">
        //         <SlideBar />
        //     </div>
        //     <div className="fixed top-0 left-w-sidebar w-w-header h-h-header z-10">
        //         <Header />
        //     </div>
        //     <div className="absolute top-h-header left-w-sidebar w-w-container">{children}</div>
        //     <div className="fixed bottom-0 left-0 w-full h-h-music-player border-t border-28">
        //         <MusicPlayer />
        //     </div>
        // </div>
        <>
            <div className="relative">
                <div className="fixed top-0 left-w-sidebar h-h-header w-w-header z-10">
                    <Header />
                </div>
                <div className="fixed top-0 left-0 w-w-sidebar h-h-sidebar">
                    <SlideBar />
                </div>
                <div className="fixed bottom-0 left-0 h-h-music-player w-full border-t border-[#282828] z-10">
                    <MusicPlayer />
                </div>
                <div className="pt-h-header pl-w-sidebar pb-h-music-player">
                    {/* <div className="pt-h-header pb-10 min-h-container">
                        {children}
                        <div className="h-px bg-line mt-5 mx-5"></div>
                    </div> */}
                    <div className="absolute top-0 left-0 w-full h-full bg-bg-primary -z-3"></div>
                    <div className="px-8 min-h-container">{children}</div>
                    <div className="h-px bg-line my-10 mx-8"></div>

                    {/* <div className="pt-h-header min-h-container">{children}</div> */}
                </div>

                {/* <div className="h-px bg-line my-10"></div> */}
            </div>
        </>
    )
}

export default DefaultLayout
