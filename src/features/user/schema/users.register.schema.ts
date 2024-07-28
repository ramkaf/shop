import Joi from "joi";

const usersRegisterSchema = Joi.object({
    email : Joi.string().required().email(),
    password : Joi.string().required(),
    firstName : Joi.string().required(),
    lastName:Joi.string().required(),
    avatar : Joi.optional()
})
export default usersRegisterSchema
