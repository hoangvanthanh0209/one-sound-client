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
        <div className="relative">
            <div className="absolute -top-h-header left-0 w-full h-full bg-1C z-[-1]"></div>
            <div className="px-8 py-6">
                <div className="flex flex-col gap-6 w-full">
                    <DashBoard title="Recently played" data={data} />
                    <DashBoard />
                    <DashBoard />
                    <DashBoard />
                    <DashBoard />
                    <DashBoard />
                </div>
            </div>
        </div>
    )
}

export default Home
