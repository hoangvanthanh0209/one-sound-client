import { FaPlay, FaEllipsisH, FaRegHeart } from 'react-icons/fa'

function ActionButton() {
    return (
        <div className="flex justify-start items-center gap-8 h-h-action-playlist">
            <div className="flex justify-center items-center rounded-full cursor-pointer bg-play-btn w-14 h-14 hover:scale-110 transition-all">
                <button className="w-5 h-5">
                    <FaPlay className="fill-black w-full h-full" />
                </button>
            </div>
            <div className="w-8 h-8 cursor-pointer">
                <button className="w-full h-full text-primary hover:text-white">
                    <FaRegHeart className="w-full h-full" />
                </button>
            </div>
            <div className="w-8 h-8 cursor-pointer">
                <button className="w-full h-full text-primary hover:text-white">
                    <FaEllipsisH className="w-full h-full" />
                </button>
            </div>
        </div>
    )
}

export default ActionButton
