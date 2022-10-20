import { SongItem } from '~/components'

function PopularSong({ data, isRedirectPlaylist = false }) {
    const HEIGHT_ITEM = 56
    const SPACING_HEADER = 20

    return (
        <div className="flex flex-col w-full h-full">
            <span className="text-2xl text-white font-bold">Bài hát nổi bật</span>
            {data.length > 0 ? (
                <div style={{ height: data.length * HEIGHT_ITEM + SPACING_HEADER + 'px' }}>
                    <div className="popular-song w-full mt-5 overflow-hidden transition-all-05">
                        {data.map((song, index) => {
                            return (
                                <SongItem
                                    key={song.id}
                                    data={song}
                                    index={index + 1}
                                    isContextMenu={false}
                                    isRedirectPlaylist={isRedirectPlaylist}
                                />
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center text-primary min-h-[80px]">
                    <span className="">Hiện không có bài hát nào</span>
                </div>
            )}
        </div>
    )
}

export default PopularSong
