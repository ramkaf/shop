import { NextFunction, Request, Response } from 'express'
import { Schema, ValidationError, ValidationErrorItem } from 'joi'
import { IPayload } from '~/features/user/interfaces/payload.interface'
import { responseToClient } from '~/globals/utils/helper'
import { HTTP_STATUS } from '../constants/http'

const formatJoiMessage = (joiMessages: ValidationErrorItem[]) => {
  return joiMessages.map((msgObj) => msgObj.message.replace(/"/g, ''))
}

export const validateBodySchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      let errorMessages = formatJoiMessage(error.details)
      return res.status(404).json({ errorMessages })
    }
    req.validatedBody = value
    next()
  }
}
export const validateParamSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, { abortEarly: false })
    if (error) {
      let errorMessages = formatJoiMessage(error.details)
      return res.status(404).json({ errorMessages })
    }
    req.validatedParams = value
    next()
  }
}

export const validateQuerySchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.query, { abortEarly: false })
      if (error) {
        let errorMessages = formatJoiMessage(error.details)
        return res.status(404).json({ errorMessages })
      }
      req.validatedQueries = value
      next()
    } catch (error) {
      console.log(error)
    }
  }
}
