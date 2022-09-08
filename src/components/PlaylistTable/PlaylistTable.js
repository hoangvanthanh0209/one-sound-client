import { PlaylistItem } from '~/components'

function PlaylistTable() {
    return (
        <div className="w-full h-full">
            <span className="text-2xl text-white">Danh sách playlist</span>
            <div className="popular-song w-full mt-5 overflow-hidden">
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
            </div>
        </div>
    )
}

export default PlaylistTable
