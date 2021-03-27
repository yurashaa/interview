import {useReducer} from 'react';
import {GET_CERTAIN_PRODUCT, GET_COMMENTS, GET_PRODUCTS} from './action-types';

const initialState = {
    products: [],
    certainProduct: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            const { payload } = action;
            console.log(payload)
            return { ...state, products: payload };
        }

        case GET_CERTAIN_PRODUCT: {
            const {payload} = action;
            console.log(payload);
            return {...state, certainProduct: payload}
        }

        case GET_COMMENTS: {
            const {payload} = action;
            console.log(payload)
            return {...state, certainProduct: {
                ...state.certainProduct,
                commentsInfo: payload
            }}
        }

        default:
            return state;
    }
}

export const useAppStateContext = () => {
    return useReducer(reducer, initialState);
};
