import ContextMenu from 'devextreme-react/context-menu'
import 'devextreme/dist/css/dx.dark.css'
import { useState } from 'react'
import { FaEllipsisH, FaPause, FaPlay, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import images from '~/assets/images'
import { setDataForm, showModal, showModalConfirm } from '~/redux/config/configSlice'
import { likeSong } from '~/redux/song/songSlice'
import { playlistSelector } from '~/redux/selector'
import { getArtistById } from '~/redux/artist/artistSlice'

function SongItem({
    data = {},
    index,
    isActive = false,
    isContextMenu = false,
    isRedirectArtist = false,
    isRedirectPlaylist = false,
    isLike = true,
    isPlay = false,
}) {
    const dispatch = useDispatch()
    const { currentPlaylist } = useSelector(playlistSelector)

    const [visibleContextMenu, setVisibleContextMenu] = useState(false)

    const items = [{ text: 'Sửa' }, { text: 'Xóa' }]

    const handleItemClick = (e) => {
        if (!e.itemData.items) {
            if (e.itemData.text === items[0].text) {
                updateSong()
            } else if (e.itemData.text === items[1].text) {
                removeSong(data.id)
            }
        }
    }

    const handleOpenContextMenu = (e) => {
        if (isContextMenu) {
            e.preventDefault()
            setVisibleContextMenu(true)
        }
    }

    const handleOptionChange = (e) => {
        if (e.fullName === 'visible') {
            setVisibleContextMenu(e.value)
        }
    }

    const updateSong = () => {
        dispatch(showModal({ title: 'Thông tin bài hát', form: 'SongForm' }))
        dispatch(setDataForm(data))
    }
    const removeSong = (id) => {
        dispatch(showModalConfirm({ id, model: 'song' }))
    }

    const handleLikeSongBtnClick = () => {
        dispatch(likeSong(data.id))
    }

    const handleArtistLinkBtnClick = () => {
        dispatch(getArtistById(currentPlaylist.userId))
    }

    const handlePlaySong = () => {
        if (isPlay) {
            console.log('zo')
        }
    }

    return (
        <>
            <div
                id="song-row"
                className={`song-row flex justify-center items-center w-full h-14 text-sm text-primary cursor-pointer ${
                    isActive ? 'song-active' : ''
                } hover:bg-[#282828]`}
                onContextMenu={handleOpenContextMenu}
                onClick={handlePlaySong}
            >
                <div className="flex justify-center items-center relative w-1/12 h-full px-2">
                    {isActive ? (
                        <>
                            <div
                                className={`${
                                    isLike ? 'song-row-number' : ''
                                } flex justify-center items-center absolute w-7 h-7`}
                            >
                                <div className="w-5 h-5">
                                    <FaPause className="fill-active w-full h-full" />
                                </div>
                            </div>
                            <button
                                className={`${
                                    isLike ? 'song-row-icon' : ''
                                } flex justify-center items-center absolute w-7 h-7 opacity-0 hover:text-indigo-600 ${
                                    isActive ? 'text-active' : 'text-white'
                                }`}
                                onClick={handleLikeSongBtnClick}
                            >
                                <div className="w-5 h-5">
                                    <FaRegHeart className="w-full h-full" />
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <span
                                className={`${
                                    isLike ? 'song-row-number' : ''
                                } absolute select-none pointer-events-none`}
                            >
                                {index}
                            </span>
                            <button
                                className={`${
                                    isLike ? 'song-row-icon' : ''
                                } flex justify-center items-center absolute w-7 h-7 opacity-0 text-white hover:text-indigo-600`}
                                onClick={handleLikeSongBtnClick}
                            >
                                <div className="w-5 h-5">
                                    <FaRegHeart className="w-full h-full" />
                                </div>
                            </button>
                        </>
                    )}
                </div>
                <div className="flex justify-start items-center w-4/12 h-full px-2">
                    <div className="w-10 h-10 mr-4">
                        <img src={data.thumbnail || images.song} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 truncate">
                        <div className="song-row-name text-base text-white truncate">{data.name}</div>
                        <div>
                            {isRedirectArtist ? (
                                <Link
                                    to={`/artist/${data.userSlug}`}
                                    className="song-row-link truncate hover:underline"
                                    onClick={handleArtistLinkBtnClick}
                                >
                                    {data.singer || 'Unkown'}
                                </Link>
                            ) : (
                                <span className="song-row-link truncate">{data.singer || 'Unkown'}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center w-3/12 h-full px-2">
                    {/* {isRedirectPlaylist ? (
                        <Link to={`/playlist/${data.playlistSlug}`} className="song-row-link truncate hover:underline">
                            {data.playlistName || 'playlist'}
                        </Link>
                    ) : (
                        <span className="song-row-link truncate">{data.playlistName || 'playlist'}</span>
                    )} */}
                    <span className="song-row-link truncate">{data.playlistName || 'playlist'}</span>
                </div>
                <div className="flex justify-start items-center w-2/12 h-full px-2">
                    <span>{moment(data.createdAt).fromNow()}</span>
                </div>
                {/* <div className="flex justify-center items-center gap-6 w-2/12 h-full px-2">
                    <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                        <FaRegHeart className="w-full h-full" />
                    </div>
                    <span>3:21</span>
                    <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                        <FaEllipsisH className="w-full h-full" />
                    </div>
                </div> */}
                <div className="flex justify-center items-center gap-6 w-2/12 h-full px-2">
                    <span>
                        {data.likeCount} {data.likeCount > 1 ? 'likes' : 'like'}
                    </span>
                </div>
            </div>
            {visibleContextMenu && (
                <ContextMenu
                    dataSource={items}
                    width={150}
                    target="#song-row"
                    visible={visibleContextMenu}
                    onItemClick={handleItemClick}
                    onOptionChanged={handleOptionChange}
                />
            )}
        </>
    )
}

export default SongItem
