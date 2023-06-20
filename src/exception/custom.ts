
/**
 * Custom Error to allow passing of HttpStatus code based on the type of error the occurred
 */
export default class CustomError extends Error {
    status?: number;

    constructor(message: string, status?: number,) {
        super(message)
        this.name = Error.name
        this.status = status;
    }
}