import {HttpStatusCode} from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

class AppError extends Error {
    public statusCode: HttpStatusCode;
    public errorCode?: AppErrorCode;
    public details?: unknown;

    constructor(
        statusCode: HttpStatusCode,
        message: string,
        errorCode?: AppErrorCode,
        details?: unknown
    ) {
        super(message)

        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError