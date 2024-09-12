import { Application } from 'express'
import 'dotenv/config'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import appRoutes from './globals/routes/appRoutes'
import { CustomError, errorHandler, NotFoundException } from './globals/middlewares/error.middleware'
import { responseToClient } from './globals/utils/helper'
import { HTTP_STATUS } from './globals/constants/http'
import { authMiddleware } from './globals/middlewares/auth.middleware'
import morgan from 'morgan';
import path from 'path'
export class Server {
  private app: Application
  constructor(app: Application) {
    this.app = app
  }
  public start(): void {
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupGlobalErrors()
    this.startServer()
  }
  private setupMiddlewares(): void {
    this.app.use(morgan('tiny'))
    this.app.use('/images', express.static(path.join(__dirname, '../../shop-starter/public')));
    this.app.use(express.json())
    this.app.use(authMiddleware)
    this.app.use((req, res, next) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      next();
    });
  }
  private setupRoutes(): void {
    appRoutes(this.app)
  }
  private setupGlobalErrors(): void {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      return next(new NotFoundException(`The URL ${req.originalUrl} not found`))
    })
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.getResponseError())
      }
      console.error(err.stack) 
      return responseToClient(res, '', HTTP_STATUS.INTERVAL_SERVER_ERROR, 'Internal Server Error')
    })
  }
  public startServer(): void {
    this.app.listen(parseInt(process.env.PORT!, 10), () =>
      console.log(`Listening on port localhost::${process.env.PORT}/`)
    )
  }
}
