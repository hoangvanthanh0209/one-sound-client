import { useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { hiddenModal } from '~/redux/slice/configSlice'

function Modal({ title, children }) {
    const modalRef = useRef()
    const modalContainerRef = useRef()
    const dispatch = useDispatch()

    const handleHiddenModal = () => {
        dispatch(hiddenModal())
    }

    const handleModalContainerClick = (e) => {
        e.stopPropagation()
    }

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
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Modal
