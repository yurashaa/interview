import axios from 'axios';
import {GET_CERTAIN_PRODUCT, GET_COMMENTS, GET_PRODUCTS} from './action-types';
import {serverURL} from '../constants';

export const getProducts = async (dispatch) => {
    try {
        const products = await axios.get(`${serverURL}/products`);

        dispatch({type: GET_PRODUCTS, payload: products.data});
    } catch (e) {
        console.log(e)
    }
}

export const getProductById = async (dispatch, id) => {
    try {
        const product = await axios.get(`${serverURL}/products/${id}`);

        dispatch({type: GET_CERTAIN_PRODUCT, payload: product.data});
    } catch (e) {
        console.log(e);
    }
}

export const getComments = async (dispatch, id) => {
    try {
        const comments = await axios.get(`${serverURL}/comments?productId=${id}`);

        dispatch({type: GET_COMMENTS, payload: comments.data});
    } catch (e) {
        console.log(e);
    }
}

export const createProduct = async (dispatch, object) => {
    try {
        const data = new FormData;

        Object.keys(object).forEach(key => {
            data.append(key, object[key]);
        })

        await axios.post(`${serverURL}/products/`, data);

        dispatch(getProducts(dispatch));
    } catch (e) {
        console.log(e);
    }
}

export const editProduct = async (dispatch, object) => {
    try {
        const data = new FormData;

        Object.keys(object).forEach(key => {
            data.append(key, object[key]);
        })

        if (typeof data.get('image') !== 'object') {
            data.delete('image');
        }

        await axios.put(`${serverURL}/products/${object.id}`, data);
        console.log(object)
        dispatch(getProductById(dispatch, object.id))
    } catch (e) {
        console.log(e)
    }
}

export const deleteProduct = async (dispatch, id) => {
    try {
        await axios.delete(`${serverURL}/products/${id}`);

        dispatch(getProducts(dispatch));
    } catch (e) {
        console.log(e);
    }
}

export const createComment = async (dispatch, data) => {
    try {
        await axios.post(`${serverURL}/comments`, data);

        dispatch(getComments(dispatch, data.productId))
    } catch (e) {
        console.log(e);
    }
}

export const deleteComment = async (dispatch, {id, productId}) => {
    try {
        await axios.delete(`${serverURL}/comments/${id}`);

        dispatch(getComments(dispatch, productId))
    } catch (e) {
        console.log(e)
    }
}
