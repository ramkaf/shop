import { NextFunction, Request, Response } from "express";
import { prisma } from "~/prisma";
import usersSchemaCreate from "../schema/users.register.schema";
import { BadRequestException, IntervalServerException } from "~/globals/middlewares/error.middleware";
import { usersService } from "~/services/db/users.service";

class UsersController {
    public async createUser(req:Request,res:Response,next:NextFunction){
            const {
                firstName , lastName , email , password , avatar
            } =req.body
            const newUser = await prisma.user.create({
                data: {
                  firstName , lastName , password , avatar , email
                },
              });
              res.status(201).json({newUser})
              console.log('Inserted user:', newUser);
        }
        public async getMe(req:Request,res:Response,next:NextFunction){
          console.log(req.currentUser);
          
        }
}
export const userController:UsersController = new UsersController();