class NotAuthorizedError extends Error {
    constructor() {
        super('Not authorized')
    }

}

export default NotAuthorizedError