import { NextFunction, Request, Response } from "express";
import { Schema, ValidationError, ValidationErrorItem } from "joi";
import { IPayload } from "~/features/user/interface/payload.interface";


  
const formatJoiMessage  = (joiMessages: ValidationErrorItem[]) => {
    return joiMessages.map(msgObj => msgObj.message.replace(/"/g, ''))
}

export const validateSchema = (schema : Schema) =>{
    return (req:Request , res:Response , next:NextFunction)=>{
        const {error , value} = schema.validate(req.body , {abortEarly:false})
        if (error){
            let errorMessages = formatJoiMessage(error.details)
            return res.status(404).json({errorMessages})
        }
        req.validatedBody = value;
        next();
    }
}