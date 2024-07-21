const messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden', // Исправлено 'Forbbieden' на 'Forbidden'
    404: 'Not Found', // Исправлено 'Not found' на 'Not Found'
    409: 'Conflict',
}

const RequestError = (status, message = messages[status]) => {
    const error = new Error(message)
    error.status = status
    
    return error
}

module.exports = RequestError