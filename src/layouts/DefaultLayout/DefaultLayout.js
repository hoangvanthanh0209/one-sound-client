import { useSelector } from 'react-redux'

import { Header, Modal, ModalConfirm, MusicPlayer, SlideBar, Spinner } from '~/components'
import { authSelector, configSelector, musicSelector, currentSelector } from '~/redux/selector'

function DefaultLayout({ children }) {
    const {
        modal: { isShow },
        modalConfirm: { isShow: isShowConfirm },
    } = useSelector(configSelector)

    const { isLoadingUser } = useSelector(authSelector)
    const { isLoadingMusic } = useSelector(musicSelector)
    const { isLoading } = useSelector(currentSelector)

    return (
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
                    <div className="absolute top-0 left-0 w-full h-full bg-bg-primary -z-3"></div>
                    <div className="px-8 min-h-container">{children}</div>
                    <div className="h-px bg-line my-10 mx-8"></div>
                </div>
            </div>
            {isShow && <Modal />}
            {isShowConfirm && <ModalConfirm />}
            {(isLoadingUser || isLoadingMusic || isLoading) && <Spinner />}
        </>
    )
}

export default DefaultLayout
