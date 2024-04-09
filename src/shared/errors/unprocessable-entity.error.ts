export class UnprocessableEntity extends Error {
  statusCode = 402;
  constructor(error: string = "Cannot create or update the animal inserted 'cause it doesn't exist") {
    super(error);
  }

  getErrorMessage(): string {
    return super.message;
  }
}
