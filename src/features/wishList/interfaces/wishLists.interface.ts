
export interface IWishListCreate {
    userId : number,
    productId : number,
}

export interface IWishListGetOne{
    id : number
}

export interface IWishDelete{
    id : number,
    userId : number
}