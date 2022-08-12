export interface ApiExceptionConstructorArgsType<T> {
  message: string;
  status: number;
  errors?: T[];
}

class ApiException<T> extends Error {
  status: number;

  errors?: T[];

  constructor({ message, status, errors }: ApiExceptionConstructorArgsType<T>) {
    super(message);

    Object.setPrototypeOf(this, ApiException.prototype);

    this.status = status;
    this.errors = errors;
  }

  static BadRequest = <E>({
    message,
    errors,
  }: Omit<ApiExceptionConstructorArgsType<E>, 'status'>) =>
    new ApiException<E>({
      status: 400,
      message,
      errors,
    });
}

export default ApiException;
