import { FaEllipsisH, FaPlay, FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ContextMenu from 'devextreme-react/context-menu'
import 'devextreme/dist/css/dx.dark.css'

import images from '~/assets/images'
import { setDataForm, showModal, showModalConfirm } from '~/redux/config/configSlice'
import { useState } from 'react'
import { playPlaylistById } from '~/redux/music/musicSlice'
import { getSongOfPlaylist } from '~/redux/me/meSlice'
import { setPlaylistIdMe } from '~/redux/current/currentSlice'

function PlaylistItem({ data = {}, index, isShowLike = false }) {
    const dispatch = useDispatch()
    const [visibleContextMenu, setVisibleContextMenu] = useState(false)
    const items = [{ text: 'Nghe' }, { text: 'Sửa' }, { text: 'Xóa' }]

    const handleItemClick = (e) => {
        if (!e.itemData.items) {
            if (e.itemData.text === items[0].text) {
                playPlaylist(data.id)
            } else if (e.itemData.text === items[1].text) {
                updatePlaylist()
            } else if (e.itemData.text === items[2].text) {
                removePlaylist(data.id)
            }
        }
    }

    const handleOpenContextMenu = (e) => {
        e.preventDefault()
        setVisibleContextMenu(true)
    }

    const handleOptionChange = (e) => {
        if (e.fullName === 'visible') {
            setVisibleContextMenu(e.value)
        }
    }

    const handlePlaylistLinkBtnClick = (id) => {
        dispatch(setPlaylistIdMe(id))
    }

    const playPlaylist = (id) => {
        dispatch(playPlaylistById(id))
    }
    const updatePlaylist = () => {
        dispatch(showModal({ title: 'Thông tin playlist', form: 'PlaylistForm' }))
        dispatch(setDataForm(data))
    }
    const removePlaylist = (id) => {
        dispatch(showModalConfirm({ id, model: 'playlist' }))
    }

    return (
        <>
            <div
                id="playlist-row"
                className="song-row flex justify-center items-center relative w-full h-14 text-sm text-primary cursor-pointer hover:bg-[#282828]"
                onContextMenu={handleOpenContextMenu}
            >
                <div className="flex justify-center items-center relative w-1/12 h-full px-2">
                    <span className="song-row-number absolute select-none pointer-events-none">{index}</span>
                    {data.countSong > 0 ? (
                        <button
                            className="song-row-icon flex justify-center items-center absolute w-7 h-7 opacity-0"
                            onClick={() => {
                                playPlaylist(data.id)
                            }}
                        >
                            <div className="w-5 h-5">
                                <FaPlay className="fill-white w-full h-full" />
                            </div>
                        </button>
                    ) : (
                        <span className="absolute select-none pointer-events-none">{index}</span>
                    )}
                </div>
                <div className="flex justify-start items-center w-4/12 h-full px-2">
                    <div className="w-10 h-10 mr-4">
                        <img src={data.thumbnail || images.playlist} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 truncate">
                        <Link
                            to={`${data.slug}`}
                            className="song-row-name text-base text-white truncate hover:underline"
                            onClick={() => {
                                handlePlaylistLinkBtnClick(data.id)
                            }}
                        >
                            {data.name}
                        </Link>
                    </div>
                </div>
                <div className="flex justify-start items-center w-3/12 h-full px-2 ">
                    <span className="truncate">
                        {/* {typeof data.description === 'undefined' ? 'Không có mô tả' : data.description} */}
                        {data.description ? data.description : 'Không có mô tả'}
                    </span>
                </div>
                <div className="flex justify-start items-center w-2/12 h-full px-2">
                    <span>{data.countSong} songs</span>
                </div>
                {/* <div className="flex justify-center items-center gap-6 w-2/12 h-full px-2">
                    <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                        <FaRegHeart className="w-full h-full" />
                    </div>
                    <span>
                        {data.likeCount} {data.likeCount > 1 ? 'likes' : 'like'}
                    </span>
                    <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                        <FaEllipsisH className="w-full h-full" />
                    </div>
                </div> */}
                <div className="flex justify-center items-center gap-6 w-2/12 h-full px-2">
                    <span>
                        {data.likeCount} {data.likeCount > 1 ? 'likes' : 'like'}
                    </span>
                    {isShowLike && (
                        <div className="song-row-icon w-5 h-5 opacity-0 hover:text-white">
                            <FaRegHeart className="w-full h-full" />
                        </div>
                    )}
                </div>
            </div>
            {visibleContextMenu && (
                <ContextMenu
                    dataSource={items}
                    width={150}
                    target="#playlist-row"
                    visible={visibleContextMenu}
                    onItemClick={handleItemClick}
                    onOptionChanged={handleOptionChange}
                />
            )}
        </>
    )
}

export default PlaylistItem
