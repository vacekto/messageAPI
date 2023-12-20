class NotAuthenticatedError extends Error {

    constructor(message?: string) {
        if (!message) message = 'Invalid credentials'
        super(message)
    }

}

export default NotAuthenticatedError