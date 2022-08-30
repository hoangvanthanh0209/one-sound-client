import { useRef, useState } from 'react'
import { FaLock, FaLockOpen, FaLongArrowAltLeft, FaRegTimesCircle, FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Login({ onClick }) {
    const passwordLock = useRef()
    const passwordUnlock = useRef()
    const passwordRef = useRef()
    const [fromData, setFormData] = useState({
        username: '',
        password: '',
    })
    const { username, password } = fromData

    const handleChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleClear = (input) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [input]: '',
            }
        })
    }

    const handleShowPassword = (lockRef, unlockRef, inputRef) => {
        lockRef.current.classList.toggle('hidden')
        unlockRef.current.classList.toggle('hidden')

        if (inputRef.current.type === 'password') {
            inputRef.current.type = 'text'
        } else {
            inputRef.current.type = 'password'
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-[500px] text-white">
            <div className="flex flex-col p-4">
                <h3 className="text-3xl font-medium text-center">Member login</h3>
                <div className="flex justify-start items-center gap-2 relative mt-10 border rounded-lg">
                    <div className="flex justify-center items-center w-10 h-10">
                        <div className="w-5 h-5">
                            <FaRegUser className="w-full h-full" />
                        </div>
                    </div>
                    <input
                        name="username"
                        value={username}
                        className="bg-transparent outline-none text-lg w-[400px] py-3 pr-10"
                        placeholder="Enter Username"
                        onChange={handleChange}
                    />
                    {username && (
                        <div
                            className="flex justify-center items-center absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 cursor-pointer"
                            onClick={() => {
                                handleClear('username')
                            }}
                        >
                            <div className="w-4 h-4">
                                <FaRegTimesCircle className="w-full h-full" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-start items-center gap-2 relative mt-5 border rounded-lg">
                    <div
                        className="flex justify-center items-center relative w-10 h-10 cursor-pointer"
                        onClick={() => {
                            handleShowPassword(passwordLock, passwordUnlock, passwordRef)
                        }}
                    >
                        <div ref={passwordLock} className="absolute w-5 h-5">
                            <FaLock className="w-full h-full" />
                        </div>
                        <div ref={passwordUnlock} className="absolute hidden w-5 h-5">
                            <FaLockOpen className="w-full h-full" />
                        </div>
                    </div>
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        value={password}
                        className="bg-transparent outline-none text-lg w-[400px] py-3 pr-10"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />
                    {password && (
                        <div
                            className="flex justify-center items-center absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 cursor-pointer"
                            onClick={() => {
                                handleClear('password')
                            }}
                        >
                            <div className="w-4 h-4">
                                <FaRegTimesCircle className="w-full h-full" />
                            </div>
                        </div>
                    )}
                </div>
                <button className="mt-10 w-full h-[52px] bg-rgba-0-05 rounded-lg hover:opacity-80">Login</button>
                <Link to={'/'} className="mt-10 text-primary text-center text-base hover:underline">
                    Forgot Username, Password
                </Link>
            </div>
            <button className="text-white flex justify-center items-center hover:underline" onClick={onClick}>
                <span>Create your account</span>
                <div className="flex justify-center items-center w-6 h-6 translate-y-[2px]">
                    <div className="w-4 h-4">
                        <FaLongArrowAltLeft className="w-full h-full" />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default Login
