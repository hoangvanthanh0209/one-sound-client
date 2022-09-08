import { useSelector } from 'react-redux'
import { Header, Modal, MusicPlayer, PlaylistForm, SlideBar, SongForm } from '~/components'
import { modalSelector } from '~/redux/selector'

function DefaultLayout({ children }) {
    const { isShow, title, form: Form } = useSelector(modalSelector)

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
            {isShow && (
                <Modal title={title}>
                    <Form />
                </Modal>
            )}
            {/* <Modal title={'Thông tin playlist'}>
                <SongForm />
            </Modal> */}
        </>
    )
}

export default DefaultLayout
