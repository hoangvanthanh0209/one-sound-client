import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card } from '~/components'
import { setCategoryId } from '~/redux/current/currentSlice'

function DashBoard({
    title = 'Title',
    data = [],
    isShowPlaylistNullSong = false,
    type = 'playlist',
    categoryId = null,
    categorySlug,
    isShowMore = true,
    itemCountShowMore = 8,
    isLimit = false,
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LIMIT_ITEM = 8

    const handleRedirectCategory = () => {
        categoryId && dispatch(setCategoryId(categoryId))
        categoryId && navigate(`/category/${categorySlug}`)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                {isShowMore && data.length > itemCountShowMore && (
                    <button
                        className="text-primary uppercase text-sm tracking-wider hover:text-white hover:tracking-widest transition-all"
                        onClick={handleRedirectCategory}
                    >
                        Xem thêm
                    </button>
                )}
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-8 gap-2 mt-4">
                    {data.map((item, index) => {
                        if (isLimit && index + 1 > LIMIT_ITEM) {
                            return
                        }
                        if (type === 'playlist') {
                            if (isShowPlaylistNullSong) {
                                return <Card key={index} type={type} data={item} />
                            } else {
                                return item.countSong > 0 && <Card key={index} type={type} data={item} />
                            }
                        } else if (type === 'artist') {
                            return <Card key={index} type={type} data={item} />
                        } else {
                            return <Card key={index} type={type} data={item} />
                        }
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center text-primary min-h-[80px]">
                    <span className="">Hiện không có {type === 'playlist' ? 'playlist' : 'bài hát'} nào</span>
                </div>
            )}
        </div>
    )
}

export default DashBoard
