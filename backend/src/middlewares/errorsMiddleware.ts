import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

export const errorsMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }

  console.error('[Error]:', err);
  const internalError = Boom.internal('Ocurrió un error en el servidor');
  return res.status(internalError.output.statusCode).json(internalError.output.payload);
};