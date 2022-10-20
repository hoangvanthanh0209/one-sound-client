import { useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import myError from '~/utils/error'
import { hiddenModalConfirm } from '~/redux/config/configSlice'
import { reloadPlaylist, reloadSong } from '~/redux/current/currentSlice'
import { authSelector, configSelector } from '~/redux/selector'
import meService from '~/redux/me/meService'

function ModalConfirm() {
    const dispatch = useDispatch()

    const {
        modalConfirm: { id, model },
    } = useSelector(configSelector)
    const { user } = useSelector(authSelector)
    const { token } = user

    const modalRef = useRef()
    const modalContainerRef = useRef()

    const [error, setError] = useState('')

    const handleHiddenModal = () => {
        dispatch(hiddenModalConfirm())
    }

    const handleModalContainerClick = (e) => {
        e.stopPropagation()
    }

    const handleDeletePlaylist = async (id) => {
        try {
            const requestStatus = await meService.deletePlaylist(id, token)

            if (requestStatus === 200) {
                toast.success('Xóa thành công')
                dispatch(hiddenModalConfirm())
                dispatch(reloadPlaylist())
            }
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }
    const handleDeleteSong = async (id) => {
        try {
            const requestStatus = await meService.deleteSong(id, token)

            if (requestStatus === 200) {
                toast.success('Xóa thành công')
                dispatch(hiddenModalConfirm())
                dispatch(reloadSong())
            }
        } catch (error) {
            console.log(error)
            const message = myError.getError(error)
            setError(message)
        }
    }

    const handleConfirmActionClick = () => {
        switch (model) {
            case 'playlist':
                handleDeletePlaylist(id)
                break
            case 'song':
                handleDeleteSong(id)
                break
            default:
                break
        }
    }
    const handleUnConfirmActionClick = () => {
        dispatch(hiddenModalConfirm())
    }

    const handleEscKeyUp = (e) => {
        if (e.key === 'Escape') {
            dispatch(hiddenModalConfirm())
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleEscKeyUp)

        return () => {
            document.removeEventListener('keyup', handleEscKeyUp)
        }
    }, [])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div
            ref={modalRef}
            className="fixed top-0 left-0 right-0 bottom-0 bg-rgba-0-03 z-20 flex justify-center items-center animate-modal-fade-in"
            onClick={handleHiddenModal}
        >
            <div
                ref={modalContainerRef}
                className="relative w-[400px] bg-white rounded flex flex-col justify-center items-center gap-5 p-10"
                onClick={handleModalContainerClick}
            >
                <div
                    className="absolute top-0 right-0 w-9 h-9 text-rgba-0-05 flex justify-center items-center cursor-pointer hover:text-black"
                    onClick={handleHiddenModal}
                >
                    <div className="w-6 h-6">
                        <FaTimes className="w-full h-full " />
                    </div>
                </div>
                <div className="text-rgba-0-07 text-lg font-bold tracking-wider">
                    <h2>Bạn chắc chắn muốn xóa?</h2>
                </div>
                <div className="flex gap-3">
                    <button
                        className="w-20 px-4 py-2 bg-blue-500 text-lg text-white font-semibold rounded"
                        onClick={handleConfirmActionClick}
                    >
                        Có
                    </button>
                    <button
                        className="w-20 px-4 py-2 bg-red-500 text-lg text-white font-semibold rounded"
                        onClick={handleUnConfirmActionClick}
                    >
                        Không
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
