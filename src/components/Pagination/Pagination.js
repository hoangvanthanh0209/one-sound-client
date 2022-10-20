function Pagination({ pagination, onPageChange }) {
    const { page, limit, totalRows } = pagination
    const totalPages = Math.ceil(totalRows / limit)

    const handlePagechange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }
    return (
        <div className="flex justify-center items-center gap-10 text-primary mt-5">
            <button
                className={`border border-primary px-3 py-1 min-w-[100px] rounded-md hover:text-indigo-600 hover:border-indigo-600 ${
                    page <= 1 ? 'btn-disabled' : ''
                }
        `}
                onClick={() => {
                    handlePagechange(page - 1)
                }}
            >
                Prev
            </button>
            <button
                className={`border border-primary px-3 py-1 min-w-[100px] rounded-md hover:text-indigo-600 hover:border-indigo-600 ${
                    page >= totalPages ? 'btn-disabled' : ''
                }`}
                onClick={() => {
                    handlePagechange(page + 1)
                }}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
