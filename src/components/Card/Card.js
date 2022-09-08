import { FaSpotify, FaPlay } from 'react-icons/fa'
import images from '~/assets/images'

function Card({ type = 'playlist', data = {} }) {
    return (
        <div className="col-span-1 p-4 bg-[#282828] border-none rounded-md overflow-hidden cursor-pointer card hover:bg-[#383838]">
            <div className="relative">
                <div
                    className={`w-full h-full border-none ${
                        type === 'artist' ? 'rounded-full' : 'rounded-md'
                    } overflow-hidden`}
                >
                    <img className="w-full h-full object-cover" src={images.avatar} alt="" />
                </div>

                {type !== 'artist' && (
                    <div className="absolute top-2 left-2 w-4 h-4">
                        <FaSpotify className="fill-white w-full h-full" />
                    </div>
                )}

                <div className="play absolute right-2 bottom-2 opacity-0 transition-opacity">
                    <div className="flex justify-center items-center bg-play-btn w-10 h-10 rounded-full shadow-md shadow-gray-700">
                        <button className="w-4 h-4">
                            <FaPlay className="fill-[#181818] w-full h-full" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="h-5 text-white font-medium truncate">
                    Top 50 - Vietnam Top 50 - Vietnam Top 50 - Vietnam Top 50 - Vietnam
                </h3>

                <div className="w-full h-10 overflow-hidden card-desc mt-2">
                    <h3 className="text-[#8a8a8a] text-sm w-full h-full">
                        Your daily update of the most played tracks right now - Vietnam.
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Card
