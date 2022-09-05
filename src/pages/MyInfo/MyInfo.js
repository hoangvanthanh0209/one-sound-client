import { useEffect, useState } from 'react'
import images from '~/assets/images'

function MyInfo() {
    const [newAvatar, setNewAvatar] = useState('')
    const [formData, setFormData] = useState({
        avatar: '',
        name: '',
        artistName: '',
        description: '',
    })

    const { avatar, name, artistName, description } = formData

    const handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = inputName === 'avatar' ? e.target.files[0] : e.target.value

        if (inputName === 'avatar') {
            const file = inputValue
            file.preview = URL.createObjectURL(file)
            setNewAvatar(file)
        }

        setFormData((prevData) => {
            return {
                ...prevData,
                [inputName]: inputValue,
            }
        })
    }

    const handleSubmit = () => {
        console.log(formData)
    }

    useEffect(() => {
        // cleanup
        return () => {
            newAvatar && URL.revokeObjectURL(newAvatar.preview)
        }
    }, [newAvatar])

    return (
        <div>
            <div className="flex justify-center items-center mt-10">
                <div className="flex flex-col justify-center items-center gap-7 bg-[#282828] rounded-md p-10 w-[600px]">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <label htmlFor="avatarzone-file">
                            <div className="w-[200px] h-[200px] rounded-full overflow-hidden border border-white cursor-pointer">
                                <img
                                    src={newAvatar.preview || images.avatar}
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
                    <div className="flex flex-col gap-1 text-primary text-base w-[350px]">
                        <label className="text-xs font-medium">Name:</label>
                        <input
                            value={name}
                            name="name"
                            className="w-[350px] outline-none bg-[#181818] px-4 py-2 rounded border border-[#282828] focus:border-38"
                            spellCheck={false}
                            onChange={handleChange}
                        />
                        <span className="text-xs font-medium text-red-500">error name</span>
                    </div>
                    <div className="flex flex-col gap-1 text-primary text-base w-[350px]">
                        <label className="text-xs font-medium">Artist Name:</label>
                        <input
                            value={artistName}
                            name="artistName"
                            className="w-[350px] outline-none bg-[#181818] px-4 py-2 rounded border border-[#282828] focus:border-38"
                            spellCheck={false}
                            onChange={handleChange}
                        />
                        <span className="text-xs font-medium text-red-500">error artist name</span>
                    </div>
                    <div className="flex flex-col gap-1 text-primary text-base w-[350px]">
                        <label className="text-xs font-medium">Description:</label>
                        <input
                            value={description}
                            name="description"
                            className="w-[350px] outline-none bg-[#181818] px-4 py-2 rounded border border-[#282828] focus:border-38"
                            spellCheck={false}
                            onChange={handleChange}
                        />
                        <span className="text-xs font-medium text-red-500">error des</span>
                    </div>
                    <div className="flex justify-center items-center w-[350px] h-[42px] bg-[#181818] px-4 py-2 rounded border border-[#282828] text-primary">
                        <button className="w-full h-full" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyInfo
