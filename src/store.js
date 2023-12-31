import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productsReducer from "./slice/productsSlice"
import productReducer from "./slice/productSlice";
import authReducer from './slice/authSlice'
import cartReducer from './slice/cartSlice'
import wishlistReducer from './slice/wishlistSlice';
import orderReducer  from './slice/orderSlice';
import userReducer from './slice/userSlice'
import categoryReducer from './slice/categorySlice'
import filterReducer from './slice/filterSlice'
const reducer = combineReducers({
    productsState: productsReducer,
    productState:productReducer,
    authState:authReducer,
    cartState:cartReducer,
    wishlistState:wishlistReducer,
    orderState:orderReducer,
    userState:userReducer,
    categoryState:categoryReducer,
    filterState:filterReducer


})

const store =configureStore({
     reducer,
     middleware:[thunk]
})

export default store;