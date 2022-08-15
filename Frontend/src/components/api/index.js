import axios from 'axios'

axios.defaults.baseURL = 'http://3.142.90.162:8080/'

export const getProductsAPI = async () => axios.get('/api/v1/products')

export const createProductAPI = async (product) =>  axios.post(`/api/v1/products/`, product)

export const createLoteAPI = async (product) =>  axios.post(`/api/v1/products/createLote`, product)

export const deleteProductByIdAPI = async (id) => axios.delete(`/api/v1/products/${id}`)

