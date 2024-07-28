import { Application } from 'express'
import 'dotenv/config'
import 'express-async-errors'
import  express , {Request , Response , NextFunction}  from 'express';
import appRoutes from './globals/routes/appRoutes';
import { CustomError, NotFoundException } from './globals/middlewares/error.middleware';
export class Server {
  private app: Application
  constructor(app: Application) {
    this.app = app
  }
  public start ():void{
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupGlobalErrors();
    this.startServer();
  }
  private setupMiddlewares():void{
    this.app.use(express.json())
  }
  private setupRoutes():void{
    appRoutes(this.app)
  }
  private setupGlobalErrors():void{
    this.app.all('*',(req:Request,res:Response,next)=>{
      return next(new NotFoundException(`the URl ${req.originalUrl} not found`))
    })

    this.app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
      if (error instanceof CustomError)
        return res.status(error.statusCode).json(error.getResponseError())
      next()
    })
  }

  public startServer (){
    this.app.listen(parseInt(process.env.PORT!),()=>console.log(`listening on port ${process.env.PORT}`)
    )
  }
}


