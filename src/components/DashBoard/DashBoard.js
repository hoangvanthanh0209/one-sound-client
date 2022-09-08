import { Link } from 'react-router-dom'
import { Card } from '~/components'

function DashBoard({ title = 'Title', data = [] }) {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                <h3 className="text-primary uppercase text-sm tracking-wider hover:text-white hover:tracking-widest transition-all">
                    <Link to={'/'}>See more</Link>
                </h3>
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4">
                {/* {data.map((item, index) => (
                    <Card key={index} data={item} />
                ))} */}
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default DashBoard
