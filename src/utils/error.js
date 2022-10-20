const getError = (error) => {
    const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return message
}

const getErrors = (error) => {
    const type = error.response.data.typeError
    const message =
        type === 'string'
            ? (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString()
            : (error.response && error.response.data && error.response.data.listError) ||
              error.message ||
              error.toString()
    return message
}

const myError = { getError, getErrors }

export default myError
