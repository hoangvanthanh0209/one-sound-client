import { useState } from 'react'

function AuthenForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
    })

    const { username, password, password2 } = formData

    const handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value

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

    return (
        <div className="flex flex-col justify-start items-center gap-4 w-[368px]">
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Username</label>
                <input
                    value={username}
                    name="username"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03 "
                    spellCheck={false}
                    onChange={handleChange}
                />
                {/* <span className="text-xs text-[#EB5757]">error</span> */}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Password</label>
                <input
                    value={password}
                    name="password"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {/* <span className="text-xs text-[#EB5757]">error</span> */}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Password2</label>
                <input
                    value={password2}
                    name="password2"
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

export default AuthenForm
