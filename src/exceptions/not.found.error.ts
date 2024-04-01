export class NotFoundException extends Error {
  statusCode = 404;
  constructor(error: string = 'Entity not found') {
    super(error);
  }

  getErrorMessage(): string {
    return super.message;
  }
}
