function Spinner() {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-rgba-0-07 flex justify-center items-center z-[100]">
            <div className="w-10 h-10 border-[2px] border-t-blue-600 border-r-gray-400 border-b-gray-400 border-l-gray-400 rounded-full animate-spin"></div>
        </div>
    )
}

export default Spinner
