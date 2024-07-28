import { Application } from "express"
import authRoute from "~/features/user/routes/auth.routes"
import userRoute from "~/features/user/routes/users.route"

const appRoutes = (app:Application)=>{
    app.use("/api/v1/users",userRoute)
    app.use("/api/v1/auth",authRoute)
}

export default appRoutes