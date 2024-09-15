import { Application } from 'express'
import authRoute from '~/features/user/routes/auth.route'
import userRoute from '~/features/user/routes/users.route'
import categoriesRouter from './../../features/category/routes/categories.routes'
import productsRouter from '~/features/product/routes/products.routes'
import wishListsRouter from '~/features/wishList/routes/wishLists.routes'
import addressesRouter from '~/features/address/routes/addresses.routes'
import variantsRouter from '~/features/productVariant/routes/variants.routes'
import cartsRouter from '~/features/cart/routes/carts.routes'

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/category', categoriesRouter)
  app.use('/api/v1/product', productsRouter)
  app.use('/api/v1/product-variants', variantsRouter)
  app.use('/api/v1/wishlist', wishListsRouter)
  app.use('/api/v1/address', addressesRouter)
  app.use('/api/v1/cart', cartsRouter)
}
export default appRoutes
