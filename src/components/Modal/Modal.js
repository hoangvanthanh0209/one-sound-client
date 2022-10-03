import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { hiddenModal } from '~/redux/config/configSlice'
import { configSelector } from '~/redux/selector'
import { InfoForm, AuthenForm, PlaylistForm, SongForm } from '~/components'

function Modal() {
    const dispatch = useDispatch()
    const modalRef = useRef()
    const modalContainerRef = useRef()
    const {
        modal: { title, form },
    } = useSelector(configSelector)
    const [Form, setForm] = useState(Fragment)

    useLayoutEffect(() => {
        setForm(() => {
            switch (form) {
                case 'InfoForm':
                    return InfoForm
                case 'AuthenForm':
                    return AuthenForm
                case 'PlaylistForm':
                    return PlaylistForm
                case 'SongForm':
                    return SongForm
                default:
                    return Fragment
            }
        })
    }, [form])

    const handleHiddenModal = () => {
        dispatch(hiddenModal())
    }

    const handleModalContainerClick = (e) => {
        e.stopPropagation()
    }

    const handleEscKeyUp = (e) => {
        if (e.key === 'Escape') {
            dispatch(hiddenModal())
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleEscKeyUp)

        return () => {
            document.removeEventListener('keyup', handleEscKeyUp)
        }
    }, [])

    return (
        <div
            ref={modalRef}
            className="fixed top-0 left-0 right-0 bottom-0 bg-rgba-0-03 z-20 flex justify-center items-center animate-modal-fade-in"
            onClick={handleHiddenModal}
        >
            <div
                ref={modalContainerRef}
                className="relative w-[900px] bg-white rounded flex flex-col justify-center items-center gap-10 p-10"
                onClick={handleModalContainerClick}
            >
                <div
                    className="absolute top-0 right-0 w-10 h-10 text-rgba-0-05 flex justify-center items-center cursor-pointer hover:text-black"
                    onClick={handleHiddenModal}
                >
                    <div className="w-7 h-7">
                        <FaTimes className="w-full h-full " />
                    </div>
                </div>
                <div className="text-rgba-0-07 text-4xl font-bold tracking-wider">
                    <h2>{title}</h2>
                </div>
                <div>
                    <Form />
                </div>
            </div>
        </div>
    )
}

export default Modal
