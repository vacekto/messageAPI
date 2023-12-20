interface IResource {
    resourceName: string,
    propKey: string | number,
    propValue: string | number
}

class ResourceNotFoundError extends Error {
    constructor({ resourceName, propKey, propValue }: IResource) {
        const message = `Resource '${resourceName}' with key: value pair: '${propKey}: ${propValue}' not found.`
        super(message)
    }
}

export default ResourceNotFoundError