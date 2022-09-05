import { Card } from '~/components'

function DashBoard({ title = 'Title', data = [] }) {
    return (
        <div>
            <h2 className="text-white text-2xl font-bold">{title}</h2>
            <div className="grid grid-cols-8 gap-2 mt-4">
                {/* {data.map((item, index) => (
                    <Card key={index} data={item} />
                ))} */}
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default DashBoard
