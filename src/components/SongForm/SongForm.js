import { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import images from '~/assets/images'
import { hiddenModal } from '~/redux/config/configSlice'
import { createSong, resetMe, updateSong } from '~/redux/me/meSlice'
import { configSelector, meSelector } from '~/redux/selector'

function SongForm() {
    const dispatch = useDispatch()
    const {
        modal: { form, data: songData },
    } = useSelector(configSelector)
    const { currentPlaylist, isSuccessMe, isErrorMe, errorMessageMe } = useSelector(meSelector)
    const [newThumbnail, setNewThumbnail] = useState('')
    const [nameSong, setNameSong] = useState('')
    const [data, setData] = useState(songData)

    const [errorName, setErrorName] = useState('')
    const [errorMp3, setErrorMp3] = useState('')

    const { thumbnail, name, mp3 } = data

    const handleChange = (e) => {
        const inputName = e.target.name
        let inputValue

        if (inputName === 'thumbnail') {
            inputValue = e.target.files[0]
            const file = inputValue
            file.preview = URL.createObjectURL(file)
            setNewThumbnail(file)
        } else if (inputName === 'mp3') {
            inputValue = e.target.files[0]
            setNameSong(inputValue.name)
        } else {
            inputValue = e.target.value
        }

        setData((prevData) => {
            return {
                ...prevData,
                [inputName]: inputValue,
            }
        })
    }

    const handleSubmit = () => {
        if (typeof name === 'undefined') {
            setErrorName('Không được để trống trường này')
        } else {
            setErrorName('')
        }

        if (!mp3) {
            setErrorMp3('Bạn chưa chọn file')
        } else {
            setErrorMp3('')
        }

        if (typeof name !== 'undefined' && mp3) {
            const isExsit = Object.keys(songData).length === 0 && songData.constructor === Object
            if (form === 'SongForm' && isExsit) {
                let formData = new FormData()
                thumbnail && formData.append('thumbnail', thumbnail)
                mp3 && formData.append('mp3', mp3)
                formData.append('name', name)
                dispatch(createSong({ songData: formData, playlistId: currentPlaylist.id }))
            } else if (form === 'SongForm' && !isExsit) {
                let formData = new FormData()
                formData.append('id', songData.id)
                thumbnail && formData.append('thumbnail', thumbnail)
                nameSong && mp3 && formData.append('mp3', mp3)
                formData.append('name', name)
                dispatch(updateSong(formData))
            }
        }
    }

    useEffect(() => {
        // cleanup
        return () => {
            newThumbnail && URL.revokeObjectURL(newThumbnail.preview)
        }
    }, [newThumbnail])

    useEffect(() => {
        if (isErrorMe) {
            toast.error(errorMessageMe)
        }

        if (isSuccessMe) {
            toast.success('Tạo mới thành công')
            dispatch(hiddenModal())
            dispatch(resetMe())
        }
    }, [isErrorMe, isSuccessMe, errorMessageMe])

    return (
        <div className="flex flex-col justify-start items-center gap-4 w-[368px]">
            <div className="flex flex-col justify-center items-center gap-1">
                <label htmlFor="thumnailzone-file">
                    <div className="w-[200px] h-[200px] overflow-hidden border border-white cursor-pointer">
                        <img
                            src={newThumbnail.preview || thumbnail || images.playlist}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </label>
                <span className="text-xs text-primary font-">Nhấn vào ảnh nếu muốn thay đổi ảnh bìa bài hát</span>
                <input
                    id="thumnailzone-file"
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Tên</label>
                <input
                    value={name}
                    name="name"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {errorName && <span className="text-xs text-[#EB5757]">{errorName}</span>}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">File bài hát: {nameSong}</label>
                <label htmlFor="songzone-file" className="w-full h-[50px]">
                    <div className="flex flex-col justify-center items-center h-full bg-rgba-0-005 border border-[#CCCCCC] border-dashed cursor-pointer">
                        <div className="w-4 h-4">
                            <FaCloudUploadAlt className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-primary">Nhấn vào đây để chọn file</span>
                    </div>
                </label>
                {errorMp3 && <span className="text-xs text-[#EB5757]">{errorMp3}</span>}
                <input
                    id="songzone-file"
                    type="file"
                    accept="audio/*"
                    name="mp3"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-center items-center w-full h-[42px] bg-[#181818] rounded border border-[#282828] text-white hover:opacity-70">
                <button className="w-full h-full" onClick={handleSubmit}>
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default SongForm
