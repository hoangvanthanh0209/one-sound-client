import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import images from '~/assets/images'
import { hiddenModal } from '~/redux/config/configSlice'
import { createPlaylist, resetMe, updatePlaylist } from '~/redux/me/meSlice'
import { categorySelector, configSelector, meSelector } from '~/redux/selector'

function PlaylistForm() {
    const dispatch = useDispatch()
    const [newThumbnail, setNewThumbnail] = useState('')
    const { isSuccessMe, isErrorMe, errorMessageMe } = useSelector(meSelector)
    const { categories } = useSelector(categorySelector)
    const {
        modal: { form, data: playlistData },
    } = useSelector(configSelector)
    const [data, setData] = useState(playlistData)

    const { thumbnail, name, categoryId, description } = data

    const [errorName, setErrorName] = useState('')

    const isNullData = Object.keys(playlistData).length === 0 && playlistData.constructor === Object

    const handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = inputName === 'thumbnail' ? e.target.files[0] : e.target.value

        if (inputName === 'thumbnail') {
            const file = inputValue
            file.preview = URL.createObjectURL(file)
            setNewThumbnail(file)
        }

        setData((prevData) => {
            return {
                ...prevData,
                [inputName]: inputValue,
            }
        })
    }

    const getData = (text, type = 'notArray', array = []) => {
        if (type === 'notArray') {
            return typeof text !== 'undefined' ? text : null
        } else {
            return typeof text !== 'undefined' ? text : array[0]
        }
    }

    const handleSubmit = () => {
        if (typeof name === 'undefined') {
            setErrorName('Không được để trống trường này')
        } else {
            if (form === 'PlaylistForm' && isNullData) {
                let formData = new FormData()
                thumbnail && formData.append('thumbnail', getData(thumbnail))
                formData.append('name', getData(name))
                formData.append('categoryId', getData(categoryId, 'array', categories).id)
                getData(description) && formData.append('description', getData(description))
                dispatch(createPlaylist(formData))
            } else if (form === 'PlaylistForm' && !isNullData) {
                let formData = new FormData()
                formData.append('id', playlistData.id)
                thumbnail && formData.append('thumbnail', thumbnail)
                formData.append('name', name)
                formData.append('categoryId', categoryId)
                formData.append('description', description)
                dispatch(updatePlaylist(formData))
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
            isNullData ? toast.success('Tạo mới thành công') : toast.success('Thay đổi thành công')
            dispatch(hiddenModal())
            dispatch(resetMe())
        }
    }, [isErrorMe, errorMessageMe, isSuccessMe, dispatch])

    return (
        <div className="flex flex-col justify-start items-center gap-4 w-[368px]">
            <div className="flex flex-col justify-center items-center gap-1">
                <label htmlFor="thumnail-file">
                    <div className="w-[200px] h-[200px] overflow-hidden border border-white cursor-pointer">
                        <img
                            src={newThumbnail.preview || thumbnail || images.playlist}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </label>
                <span className="text-xs text-primary font-">Nhấn vào ảnh nếu muốn thay đổi ảnh bìa playlist</span>
                <input
                    id="thumnail-file"
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
                <label className="text-xs text-[#666666] font-semibold">Thể loại</label>
                <select
                    value={categoryId}
                    name="categoryId"
                    id="categories"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    onChange={handleChange}
                >
                    {categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Mô tả</label>
                <input
                    value={description}
                    name="description"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
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

export default PlaylistForm
