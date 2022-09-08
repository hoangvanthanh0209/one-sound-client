import { SongItem } from '~/components'

function SongTable() {
    return (
        <div className="w-full h-full">
            <span className="text-2xl text-white">Danh sách bài hát</span>
            <div className="popular-song w-full mt-5 overflow-hidden">
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
            </div>
        </div>
    )
}

export default SongTable
