import { FaSpotify } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import config from '~/config'
import { authSelector } from '~/redux/selector'
import { Spinner } from '~/components'

function MusicLayout({ children }) {
    const { isLoadingAuth } = useSelector(authSelector)

    return (
        <div className="bg-music min-h-screen h-screen object-cover">
            <Link to={config.routes.home} className="flex justify-start items-center px-8 gap-4 h-h-header text-white">
                <div className="w-8 h-8">
                    <FaSpotify className="w-full h-full" />
                </div>
                <span className="text-2xl font-semibold">One sound</span>
            </Link>
            <div className="flex justify-center items-center h-h-container">{children}</div>
            {isLoadingAuth && <Spinner />}
        </div>
    )
}

export default MusicLayout
