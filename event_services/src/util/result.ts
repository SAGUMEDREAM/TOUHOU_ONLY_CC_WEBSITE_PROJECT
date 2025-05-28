export class Result<T> {
    code: number;
    data: T;
    message: string;

    public constructor(code: number, data: any, message: string) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public static success<T>(data: T, message: string = "success"): Result<T> {
        return new Result<T>(200, data, message);
    }

    public static error<T>(data: T, message: string = "error"): Result<T> {
        return new Result<T>(400, data, message);
    }
}