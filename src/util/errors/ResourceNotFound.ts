interface IResource {
    name: string,
    key: string | number,
    value: string | number
}

export default class ResourceNotFoundError extends Error {
    constructor({ name, key, value }: IResource) {
        const message = `Resource ${name} with ${key}: ''${value} not found.`
        super(message)
    }
}