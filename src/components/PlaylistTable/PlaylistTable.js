import { useDispatch } from 'react-redux'
import { PlaylistItem } from '~/components'
import { showModal } from '~/redux/config/configSlice'

function PlaylistTable({ data = [] }) {
    const dispatch = useDispatch()

    const handleAddBtnClick = () => {
        dispatch(showModal({ title: 'Thông tin playlist', form: 'PlaylistForm' }))
    }

    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center">
                <span className="text-2xl text-white">Danh sách playlist</span>
                <button
                    className="text-lg font-semibold text-primary px-2 py-1 hover:text-white hover:bg-rgba-0-005 hover:rounded"
                    onClick={handleAddBtnClick}
                >
                    Thêm mới
                </button>
            </div>
            <div className="popular-song w-full mt-5 min-h-[310px]">
                {data.map((playlist, index) => {
                    return <PlaylistItem key={playlist.id} data={playlist} index={index + 1} />
                })}
            </div>
        </div>
    )
}

export default PlaylistTable
