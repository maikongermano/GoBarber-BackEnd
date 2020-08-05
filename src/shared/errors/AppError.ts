// classes próprias de trativas de erros
class AppError {
  public readonly message: string;

  public readonly statusCode: number; // 401 404 codigos de erros

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
