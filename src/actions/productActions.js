import axios from "axios";
import { adminProductsFail, adminProductsRequest,adminProductsSuccess, productsFail, productsRequest, productsSuccess, activeProductsFail,activeProductsRequest,activeProductsSuccess,inactiveProductsFail,inactiveProductsRequest,inactiveProductsSuccess } from "../slice/productsSlice";
import { deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from "../slice/productSlice";



export const getfilterProducts = (price) => async (dispatch)=>{

    try{
         dispatch(productsRequest())
         const {data} =  await axios.get(`${process.env.REACT_APP_URL}/api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}`);
         console.log(data);
         dispatch(productsSuccess(data))

    }
    catch (error){
       //handle error

        dispatch(productsFail(error.response.data.message)) 

    }

     
}
export const getProducts = async (dispatch)=>{

    try{
         dispatch(productsRequest())
         const {data} =  await axios.get(`${process.env.REACT_APP_URL}/api/v1/products`);
         dispatch(productsSuccess(data))

    }
    catch (error){
       //handle error

        dispatch(productsFail(error.response.data.message)) 

    }

     
}
export const getActiveProducts = async (dispatch)=>{

    try{
         dispatch(activeProductsRequest())
     
         const {data} =  await axios.get(`${process.env.REACT_APP_URL}/api/v1/products/active`);
         dispatch(activeProductsSuccess(data))

    }
    catch (error){
       //handle error

        dispatch(activeProductsFail(error.response.data.message)) 

    }

     
}
export const getInActiveProducts = async (dispatch)=>{

    try{
        dispatch(inactiveProductsRequest())
    

         const {data} =  await axios.get(`${process.env.REACT_APP_URL}/api/v1/products/inactive`);
         dispatch(inactiveProductsSuccess(data))

    }
    catch (error){
       //handle error

        dispatch(inactiveProductsFail(error.response.data.message)) 

    }

     
}

export const getProduct = id => async (dispatch)=>{
 
    try{
         dispatch(productRequest())
         const {data} = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/${id}`);
         dispatch(productSuccess(data))

    }
    catch(error){
       //handle error

       dispatch(productFail(error.response.data.message)) 

    }
     
}

export const getAdminProducts =  async(dispatch)=>{
    try{
        dispatch(adminProductsRequest())
     
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/admin/products`);

        dispatch(adminProductsSuccess(data))
    }catch(error){
        dispatch(adminProductsFail(error.response.data.message))
    }
}

export const createNewProduct = (productData) => async(dispatch)=>{
    try{
         dispatch(newProductRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/admin/product/new`,productData);
        dispatch(newProductSuccess(data))
    }
    catch(error){
        dispatch(newProductFail(error.response.data.message))
    }
}


export const updateProduct = (id,productData) => async(dispatch)=>{
    try{
        dispatch(updateProductRequest())
  
        const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/v1/admin/product/${id}`,productData);
        dispatch(updateProductSuccess(data))
    }catch(error){
        dispatch(updateProductFail(error.response.data.message))
    }
}
export const deleteProduct = id => async(dispatch)=>{
    try{
        dispatch(deleteProductRequest())
     
      
        await axios.delete(`${process.env.REACT_APP_URL}/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    }catch(error){
        dispatch(deleteProductFail(error.response.data.message))
    }
}
