import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: []
}

const productSlice = createSlice(
    {
        name: "product",
        initialState,
        reducers: {
            loadproduct: (state, action) => {
                state.products = action.payload
            },
            loadlazyproduct: (state, action) => {
                const newProducts = action.payload;
                const uniqueNewProducts = newProducts.filter(
                    newProd => !state.products.some(
                        existingProd => existingProd.id === newProd.id
                    )
                );
                state.products = [...state.products, ...uniqueNewProducts];
            },
            addProduct: (state, action) => {
                state.products.push(action.payload);
            },
            updateProductLocally: (state, action) => {
                const { id, changes } = action.payload;
                const index = state.products.findIndex(p => p.id === id);
                if (index !== -1) {
                    state.products[index] = { ...state.products[index], ...changes };
                }
            }
        }
    }
)
export const { loadproduct, loadlazyproduct, addProduct, updateProductLocally } = productSlice.actions
export default productSlice.reducer