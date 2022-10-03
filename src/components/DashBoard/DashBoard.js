import { Link } from 'react-router-dom'
import { Card } from '~/components'

function DashBoard({ title = 'Title', data = [], length = 0, showPlaylistNullSong = false, type = 'playlist' }) {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                {length > 8 && (
                    <h3 className="text-primary uppercase text-sm tracking-wider hover:text-white hover:tracking-widest transition-all">
                        <Link to={'/'}>Xem thêm</Link>
                    </h3>
                )}
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4">
                {data.map((item, index) => {
                    if (showPlaylistNullSong) {
                        return <Card key={item.id} type={type} data={item} />
                    }
                    return type === 'playlist' ? (
                        item.countSong > 0 && <Card key={index} type={type} data={item} />
                    ) : (
                        <Card key={item.id} type={type} data={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default DashBoard
