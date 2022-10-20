import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { changePassword, resetAuth } from '~/redux/auth/authSlice'
import { hiddenModal } from '~/redux/config/configSlice'
import { authSelector } from '~/redux/selector'

function AuthenForm() {
    const dispatch = useDispatch()
    const {
        user,
        isErrorAuth,
        isSuccessAuth,
        successMessageAuth,
        errorMessageAuth,
        listErrorMessageAuth = [],
    } = useSelector(authSelector)
    const [formData, setFormData] = useState({
        oldPassword: '',
        password: '',
        password2: '',
    })

    const { oldPassword, password, password2 } = formData

    let [oldErrorPassword, errorPassword] = listErrorMessageAuth
    let [errorPassword2, setErrorPassword2] = useState('')

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
        if (password.length < 6) {
            oldErrorPassword = 'Mật khẩu phải có ít nhất 6 ký tự'
        } else {
            oldErrorPassword = ''
        }

        if (password !== password2) {
            setErrorPassword2('Nhập lại mật khẩu không đúng')
        } else {
            setErrorPassword2('')
        }

        dispatch(changePassword({ oldPassword, password }))
    }

    useEffect(() => {
        if (isErrorAuth && errorMessageAuth) {
            toast.error(errorMessageAuth)
        }

        if (!isErrorAuth && isSuccessAuth) {
            toast.success(successMessageAuth)
            dispatch(hiddenModal())
            dispatch(resetAuth())
        }
    }, [user, isErrorAuth, isSuccessAuth, successMessageAuth, errorMessageAuth, dispatch])

    return (
        <div className="flex flex-col justify-start items-center gap-4 w-[368px]">
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Mật khẩu cũ</label>
                <input
                    value={oldPassword}
                    type="password"
                    name="oldPassword"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {oldErrorPassword && <span className="text-xs text-[#EB5757]">{oldErrorPassword}</span>}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Mật khẩu mới</label>
                <input
                    value={password}
                    type="password"
                    name="password"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {errorPassword && <span className="text-xs text-[#EB5757]">{errorPassword}</span>}
            </div>
            <div className="flex flex-col justify-start gap-2 w-full h-[98px]">
                <label className="text-xs text-[#666666] font-semibold">Xác nhận mật khẩu</label>
                <input
                    value={password2}
                    type="password"
                    name="password2"
                    className="bg-rgba-0-005 border border-[#CCCCCC] outline-none rounded w-full px-4 py-3 focus:border-rgba-0-03"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {errorPassword2 && <span className="text-xs text-[#EB5757]">{errorPassword2}</span>}
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
