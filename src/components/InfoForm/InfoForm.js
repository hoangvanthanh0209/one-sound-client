import { useEffect, useState } from 'react'
import images from '~/assets/images'

function InfoForm() {
    const [newAvatar, setNewAvatar] = useState('')
    const [formData, setFormData] = useState({
        avatar: '',
        name: '',
        artistName: '',
        description: '',
    })

    const { name, artistName, description } = formData

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
        <div className="flex flex-col justify-start items-center gap-4 w-[368px]">
            <div className="flex flex-col justify-center items-center gap-1">
                <label htmlFor="avatarzone-file">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden border border-white cursor-pointer">
                        <img src={newAvatar.preview || images.avatar} alt="" className="w-full h-full object-cover" />
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
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Name</label>
                <input
                    value={name}
                    name="name"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {/* <span className="text-xs text-[#EB5757]">error</span> */}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Name</label>
                <input
                    value={artistName}
                    name="artistName"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {/* <span className="text-xs text-[#EB5757]">error</span> */}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Name</label>
                <input
                    value={description}
                    name="description"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {/* <span className="text-xs text-[#EB5757]">error</span> */}
            </div>
            <div className="flex justify-center items-center w-full h-[42px] bg-[#181818] rounded border border-[#282828] text-white hover:opacity-70">
                <button className="w-full h-full" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default InfoForm
