import ApiException from '~/exceptions';
import { Request, Response } from 'express';

const errorMiddleware = (
  err: InstanceType<typeof ApiException> | Error,
  _: Request,
  res: Response
) => {
  console.error(err);

  if (err instanceof ApiException) {
    const { status, errors, message } = err;
    res.status(status).json({ message, errors });
    return;
  }

  res.status(500).json({ message: 'Something went wrong' });
};

export default errorMiddleware;
