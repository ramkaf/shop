export interface ICartItemCreate {
  variantItemId: number
  userId: number
  price: number
}

export interface ICartItem {
  id: number
  cartId: number
  variantId: number
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export interface ICart {
  id: number
  totalPrice: number // Calculated total price for the cart
  userId: number
  createdAt: Date
  updatedAt: Date
  cartItems: ICartItem[] // Array of cart items
}

export interface ICartResponse {
  cart: ICart | null // Cart can be null if not found
  totalPrice: number // Total price of items in the cart
}
