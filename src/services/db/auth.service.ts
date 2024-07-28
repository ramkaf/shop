import { prisma } from "~/prisma"
import { User } from "@prisma/client"
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { IAuthLogin, IAuthRegister } from "~/features/user/interface/auth.interface";
import { IPayload } from "~/features/user/interface/payload.interface";
import { usersService } from './users.service';
import { jwtService } from "./jwt.service";
import { passwordService } from "./password.service";

class AuthService {
    public async createUser(body: IAuthRegister): Promise<{ user: User; accessToken: string }> {
        const { email, password, firstName, lastName, avatar } = body;
        const hash = await passwordService.hashPassword(password)
        const newUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password : hash,
            avatar,
          },
        });
        const payload = { firstName, lastName, email , role:newUser.role};
        const accessToken = await jwtService.generateAccessToken(payload)
        return { user: newUser, accessToken }; // Changed newUser to user
      } 
      public async loginUser(body: IAuthLogin): Promise<{ user: User; accessToken: string }> {
        const user = await usersService.getUserByEmail(body.email)
        if (!user || !await passwordService.checkPassword(body.password , user.password)){
          throw new BadRequestException("invalid creditinal")
        }
        const {firstName , lastName , email ,role} = user;
        const payload:IPayload = {firstName , lastName , email , role};
        const accessToken = await jwtService.generateAccessToken(payload);
        return { user:user! , accessToken }; // Changed newUser to user
      } 
      
    public async isEmailAlreadyExist (email:string) :Promise<Boolean> {
        const user = await prisma.user.findFirst({where : {email}})
        return user != null
    }

   
    

}

export const authService:AuthService = new AuthService()