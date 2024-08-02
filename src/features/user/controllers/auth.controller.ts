import { Request , Response , NextFunction } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { authService } from "~/services/db/auth.service";
import { passwordService } from "~/services/db/password.service";

export class AuthController {
    public async register(req:Request,res:Response,next:NextFunction){
        const {firstName , lastName , username , password , email , avatar} = req.validatedBody;
        if (await authService.isEmailAlreadyExist(email))
            throw new BadRequestException("email are already existed ...")
        if (await authService.isUsernameAlreadyExist(username))
            throw new BadRequestException("username are already taken...")
        const hashPassword = await passwordService.hashPassword(password)
        const data = await authService.createUser({firstName ,lastName , email , username , password:hashPassword , avatar})
        return res.status(HTTP_STATUS.CREATED).json({message:"user created successfully ", data});
    }
    public async login (req:Request,res:Response,next:NextFunction){
        if (!await authService.isEmailAlreadyExist(req.body.email))
            return next( new BadRequestException("Email is not valid.."))  
        const data = await authService.loginUser(req.validatedBody)
        return res.status(HTTP_STATUS.CREATED).json({message:"user logged in successfully ", data});
    
    }
    
}

export const authController:AuthController = new AuthController()