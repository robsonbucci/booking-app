export class ErrorFactory {
  static createError(statusCode: number, message: string) {
    const err = new Error();
    (err as any).status = statusCode;
    err.message = message;

    return err;
  }
}
