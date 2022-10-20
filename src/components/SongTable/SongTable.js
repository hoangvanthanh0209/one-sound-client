import { useDispatch } from 'react-redux'
import { SongItem } from '~/components'
import { showModal } from '~/redux/config/configSlice'

function SongTable({ data = [], playlistName, isContextMenu = false }) {
    const dispatch = useDispatch()

    const handleAddBtnClick = () => {
        dispatch(showModal({ title: 'Thông tin bài hát', form: 'SongForm' }))
    }

    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center">
                <span className="text-2xl text-white">{playlistName || 'Loading'}/Danh sách bài hát</span>
                <button
                    className="text-lg font-semibold text-primary px-2 py-1 hover:text-white hover:bg-rgba-0-005 hover:rounded"
                    onClick={handleAddBtnClick}
                >
                    Thêm mới
                </button>
            </div>
            <div className="popular-song w-full mt-5 min-h-[310px] overflow-hidden">
                {data.length > 0 ? (
                    data.map((song, index) => {
                        return (
                            <SongItem
                                key={song.id}
                                data={song}
                                index={index + 1}
                                isContextMenu={isContextMenu}
                                isLike={false}
                            />
                        )
                    })
                ) : (
                    <div className="flex justify-center items-center text-primary h-full">
                        <span className="">Hiện không có bài hát nào</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SongTable
