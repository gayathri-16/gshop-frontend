import axios from "axios";
import { adminProductsFail, adminProductsRequest,adminProductsSuccess, productsFail, productsRequest, productsSuccess } from "../slice/productsSlice";
import { deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from "../slice/productSlice";



export const getProducts = async (dispatch)=>{
      const cat = ''
    try{
         dispatch(productsRequest())
         const {data} =  await axios.get(`http://ec2-3-106-55-184.ap-southeast-2.compute.amazonaws.com:8001/api/v1/products`);
         dispatch(productsSuccess(data))

    }
    catch (error){
       //handle error

        dispatch(productsFail(error.response.data.message)) 

    }

     
}

export const getProduct = id => async (dispatch)=>{
 
    try{
         dispatch(productRequest())
         const {data} = await axios.get(`/api/v1/product/${id}`);
         dispatch(productSuccess(data))

    }
    catch(error){
       //handle error

       dispatch(productFail(error.response.data.message)) 

    }
     
}

export const getAdminProducts = async(dispatch)=>{
    try{
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
    }catch(error){
        dispatch(adminProductsFail(error.response.data.message))
    }
}
export const createNewProduct = productData => async(dispatch)=>{
    try{
        dispatch(newProductRequest())
        const { data } = await axios.post(`/api/v1/admin/product/new`,productData);
        dispatch(newProductSuccess(data))
    }
    catch(error){
        dispatch(newProductFail(error.response.data.message))
    }
}


export const updateProduct = (id,productData) => async(dispatch)=>{
    try{
        dispatch(updateProductRequest())
        const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData);
        dispatch(updateProductSuccess(data))
    }catch(error){
        dispatch(updateProductFail(error.response.data.message))
    }
}
export const deleteProduct = id => async(dispatch)=>{
    try{
        dispatch(deleteProductRequest())
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    }catch(error){
        dispatch(deleteProductFail(error.response.data.message))
    }
}
