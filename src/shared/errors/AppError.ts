export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly title: string = 'Ocorreu um erro!';

  constructor(message: string, statusCode = 400, titleMessage?: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.title = titleMessage || this.title;
  }

  getMessage() {
    return {
      success: false,
      title: this.title,
      message: this.message,
    };
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, titleMessage?: string) {
    super(message, 400, titleMessage || 'Requisição inválida!');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, titleMessage?: string) {
    super(message, 401, titleMessage || 'Não autorizado!');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, titleMessage?: string) {
    super(message, 403, titleMessage || 'Proibido!');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, titleMessage?: string) {
    super(message, 404, titleMessage || 'Não encontrado!');
  }
}
