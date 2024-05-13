export class AnimalTypeNotFoundException extends Error {
  statusCode = 404;
  constructor(error: string = "Cannot create or update the animal inserted 'cause it doesn't exist") {
    super(error);
  }

  getErrorMessage(): string {
    return super.message;
  }
}
