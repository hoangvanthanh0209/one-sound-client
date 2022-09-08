import { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import images from '~/assets/images'

function SongForm() {
    const [newThumbnail, setNewThumbnail] = useState('')
    const [nameSong, setNameSong] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        thumbnail: '',
        mp3: '',
    })

    const { name } = formData

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
            newThumbnail && URL.revokeObjectURL(newThumbnail.preview)
        }
    }, [newThumbnail])

    return (
        <div className="flex flex-col justify-start items-center gap-4 w-[368px]">
            <div className="flex flex-col justify-center items-center gap-1">
                <label htmlFor="thumnailzone-file">
                    <div className="w-[200px] h-[200px] overflow-hidden border border-white cursor-pointer">
                        <img
                            src={newThumbnail.preview || images.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </label>
                <span className="text-xs text-primary">Click on the picture to change the thumnail song</span>
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
                <label className="text-xs text-[#666666] font-semibold">Song file: {nameSong}</label>
                <label htmlFor="songzone-file" className="w-full h-[50px]">
                    <div className="flex flex-col justify-center items-center h-full bg-rgba-0-005 border border-[#CCCCCC] border-dashed cursor-pointer">
                        <div className="w-4 h-4">
                            <FaCloudUploadAlt className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-primary">Click here to choose the song file</span>
                    </div>
                </label>
                {/* <span className="w-full text-xs text-[#EB5757]">co-le-la-gi-do.mp3</span> */}
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
                    Submit
                </button>
            </div>
        </div>
    )
}

export default SongForm
