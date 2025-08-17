import axios from '../../api/axiosconfig'
import { addProduct, loadproduct, updateProductLocally } from '../reducers/productSlice'


export const asyncLoadProduct = (product) => async (dispatch, getState) => {

    try { 
        
        const {data} = await axios.get(`/products`)
        dispatch(loadproduct(data))
    } catch (error) {
        console.log(error)
    }
}
export const asyncCreateProduct = (product) => async (dispatch, getState) => {

    try { 
        const products = await axios.post("/products",product)
        // dispatch(asyncLoadProduct())
        dispatch(addProduct(data)); 
    } catch (error) {
        console.log(error)
    }
}
export const asyncUpdateProduct = (id  ,product) => async (dispatch, getState) => {

    try { 
         await axios.patch(`/products/${id}`,product)
        // dispatch(asyncLoadProduct())
        dispatch(updateProductLocally({ id, changes: product }));
    } catch (error) {
        console.log(error)
    }
}
export const asyncDeleteProduct = (id ) => async (dispatch, getState) => {

    try { 
         await axios.delete("/products/" + id)
        dispatch(asyncLoadProduct())
    } catch (error) {
        console.log(error)
    }
}