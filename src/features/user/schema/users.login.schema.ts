import Joi from "joi";

const usersLoginSchema = Joi.object({
    email : Joi.string().required().email(),
    password : Joi.string().required(),
})
export default usersLoginSchema
