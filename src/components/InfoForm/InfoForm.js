import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import images from '~/assets/images'
import { resetAuth, updateInfo } from '~/redux/auth/authSlice'
import { hiddenModal } from '~/redux/config/configSlice'
import { authSelector } from '~/redux/selector'

function InfoForm() {
    const { user, isSuccessAuth, isErrorAuth, errorMessageAuth } = useSelector(authSelector)
    const [newAvatar, setNewAvatar] = useState('')
    const dispatch = useDispatch()

    const [data, setData] = useState({
        avatar: user.avatar,
        name: user.name,
        artistName: user.artistName,
        description: user.description,
    })

    const { avatar, name, artistName, description } = data

    const handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = inputName === 'avatar' ? e.target.files[0] : e.target.value

        if (inputName === 'avatar' && inputValue) {
            const file = inputValue
            file.preview = URL.createObjectURL(file)
            setNewAvatar(file)
        }

        setData((prevData) => {
            return {
                ...prevData,
                [inputName]: inputValue,
            }
        })
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('avatar', avatar)
        formData.append('name', name)
        formData.append('artistName', artistName)
        formData.append('description', description)
        dispatch(updateInfo(formData))
    }

    useEffect(() => {
        // cleanup
        return () => {
            newAvatar && URL.revokeObjectURL(newAvatar.preview)
        }
    }, [newAvatar])

    useEffect(() => {
        if (isErrorAuth) {
            toast.error(errorMessageAuth)
        }

        if (isSuccessAuth) {
            dispatch(hiddenModal())
            dispatch(resetAuth())
        }
    }, [isErrorAuth, errorMessageAuth, isSuccessAuth, dispatch])

    return (
        <div className="flex flex-col justify-start items-center gap-6 w-[368px]">
            <div className="flex flex-col justify-center items-center gap-1">
                <label htmlFor="avatarzone-file">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden border border-white cursor-pointer">
                        <img
                            src={newAvatar.preview || avatar || images.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </label>
                <span className="text-xs text-primary font-">Click on the picture to change the avatar</span>
                <input
                    id="avatarzone-file"
                    type="file"
                    accept="image/*"
                    name="avatar"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col justify-start gap-2 w-full">
                <label className="text-xs text-[#666666] font-semibold">Tên</label>
                <input
                    value={name}
                    name="name"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col justify-start gap-2 w-full">
                <label className="text-xs text-[#666666] font-semibold">Nghệ danh</label>
                <input
                    value={artistName}
                    name="artistName"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col justify-start gap-2 w-full">
                <label className="text-xs text-[#666666] font-semibold">Mô tả bản thân</label>
                <input
                    value={description}
                    name="description"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-center items-center w-full h-[42px] mt-6 bg-[#181818] rounded border border-[#282828] text-white hover:opacity-70">
                <button className="w-full h-full" onClick={handleSubmit}>
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default InfoForm
