import { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import images from '~/assets/images'
import myError from '~/utils/error'
import { hiddenModal } from '~/redux/config/configSlice'
import { reloadSong, resetLoading, setLoading } from '~/redux/current/currentSlice'
import { authSelector, configSelector, currentSelector } from '~/redux/selector'
import meService from '~/redux/me/meService'

function SongForm() {
    const dispatch = useDispatch()
    const {
        modal: { data: songData },
    } = useSelector(configSelector)
    const { playlistIdMe } = useSelector(currentSelector)
    const { user } = useSelector(authSelector)
    const { token } = user

    const [newThumbnail, setNewThumbnail] = useState('')
    const [nameSong, setNameSong] = useState('')
    const [data, setData] = useState(songData)

    const [errorName, setErrorName] = useState('')
    const [errorMp3, setErrorMp3] = useState('')
    const [error, setError] = useState('')

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

    const createSong = async () => {
        try {
            dispatch(setLoading())
            let formData = new FormData()
            thumbnail && formData.append('thumbnail', thumbnail)
            mp3 && formData.append('mp3', mp3)
            formData.append('name', name)

            const requestStatus = await meService.createSong({ songData: formData, playlistId: playlistIdMe }, token)

            if (requestStatus === 201) {
                toast.success('Tạo mới thành công')
                dispatch(hiddenModal())
                dispatch(reloadSong())
            }

            dispatch(resetLoading())
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const updateSong = async () => {
        try {
            dispatch(setLoading())
            let formData = new FormData()
            formData.append('id', songData.id)
            thumbnail && formData.append('thumbnail', thumbnail)
            nameSong && mp3 && formData.append('mp3', mp3)
            formData.append('name', name)

            const requestStatus = await meService.updateSong(formData, token)

            if (requestStatus === 201) {
                toast.success('Thay đổi thành công')
                dispatch(hiddenModal())
                dispatch(reloadSong())
            }

            dispatch(resetLoading())
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const validationForm = () => {
        let errorName, errorMp3
        if (typeof name === 'undefined') {
            setErrorName('Không được để trống trường này')
            errorName = true
        } else {
            setErrorName('')
            errorName = false
        }

        if (!mp3) {
            setErrorMp3('Bạn chưa chọn file')
            errorMp3 = true
        } else {
            setErrorMp3('')
            errorMp3 = false
        }

        return errorName || errorMp3
    }

    const handleSubmit = async () => {
        const isError = validationForm()

        if (isError) {
            return
        }

        const isNullData = Object.keys(songData).length === 0 && songData.constructor === Object
        if (isNullData) {
            createSong()
        } else {
            updateSong()
        }
    }

    useEffect(() => {
        return () => {
            newThumbnail && URL.revokeObjectURL(newThumbnail.preview)
        }
    }, [newThumbnail])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

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
