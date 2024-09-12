import { NextFunction, Response, Request, RequestHandler } from 'express'
import { HTTP_STATUS } from '../constants/http'
export abstract class CustomError extends Error {
  abstract status: string
  abstract statusCode: number
  constructor(message: string) {
    super(message)
  }
  public getResponseError() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message
    }
  }
}
export class BadRequestException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTP_STATUS.BAD_REQUEST
  constructor(message: string) {
    super(message)
  }
}
export class UnAuthorizedException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTP_STATUS.UNAUTHORIZED
  constructor(message: string) {
    super(message)
  }
}
export class ForbiddenException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTP_STATUS.FORBIDDEN
  constructor(message: string) {
    super(message)
  }
}
export class NotFoundException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTP_STATUS.NOT_FOUND
  constructor(message: string) {
    super(message)
  }
}
export class IntervalServerException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTP_STATUS.INTERVAL_SERVER_ERROR
  constructor(message: string) {
    super(message)
  }
}
export function asyncWrapper(callback: any): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error: any) {
      next(new IntervalServerException(error.message))
    }
  }
}
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(err.status || HTTP_STATUS.INTERVAL_SERVER_ERROR).json({
    message: err.message || 'Internal Server Error'
  })
}
