// This file is used to handle apierror in standard way documentation- nodejs api error

class ApiError extends Error {
    statusCode: number;
    errors: any[];
    data: any;
    success: boolean;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}




export {ApiError}