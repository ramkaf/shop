import { Application } from 'express'
import authRoute from '~/features/user/routes/auth.route'
import userRoute from '~/features/user/routes/users.route'
import categoriesRouter from './../../features/category/routes/categories.routes'
import productsRouter from '~/features/product/routes/products.routes'
import productVariantsRouter from '~/features/productVariant/routes/productVariants.routes'
import productVariantItemsRouter from '~/features/productVariant/routes/productVariantItems.routes'
import wishListsRouter from '~/features/wishList/routes/wishLists.routes'
const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/category', categoriesRouter)
  app.use('/api/v1/product', productsRouter)
  app.use('/api/v1/product-variants', productVariantsRouter)
  app.use('/api/v1/product-variant-items', productVariantItemsRouter)
  app.use('/api/v1/wishlist', wishListsRouter)
}
export default appRoutes
