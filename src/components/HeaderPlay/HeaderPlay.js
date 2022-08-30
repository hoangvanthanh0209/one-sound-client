import { FaPlay } from 'react-icons/fa'

function HeaderPlay() {
    return (
        <div className="absolute left-8 h-full flex justify-center items-center transition-all animate-show-slow">
            <div className="flex justify-center items-center rounded-full cursor-pointer bg-play-btn w-10 h-10">
                <button className="w-5 h-5">
                    <FaPlay className="fill-18 w-full h-full" />
                </button>
            </div>
            <span className="text-white text-2xl font-semibold ml-4">Phuong Ly</span>
        </div>
    )
}

export default HeaderPlay
