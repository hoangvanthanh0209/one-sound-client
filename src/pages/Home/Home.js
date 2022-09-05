import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DashBoard } from '~/components'
import { colorSelector } from '~/redux/selector'
import { resetColor } from '~/redux/slice/configSlice'

function Home() {
    const dispatch = useDispatch()
    const color = useSelector(colorSelector)

    const data = [1]

    useLayoutEffect(() => {
        dispatch(resetColor())
    }, [color])

    return (
        <div className="flex flex-col gap-6 w-full">
            <DashBoard title="Recently played" data={data} />
            <DashBoard />
            <DashBoard />
            <DashBoard />
            <DashBoard />
            <DashBoard />
        </div>
    )
}

export default Home
