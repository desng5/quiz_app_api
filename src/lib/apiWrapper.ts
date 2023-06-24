import axios, { AxiosResponse } from 'axios';
import PostType from '../types/posts';
import UserType from '../types/auth';

const base: string = 'http://127.0.0.1:5000/api';
const postEndpoint: string = './posts';
const userEndpoint = '/users';

const apiClientNoAuth = () => axios.create({
    baseURL: base
})

type APIResponse<T> = {
    error: string | undefined;
    data: T | undefined
}

async function getAllPosts(): Promise<APIResponse<PostType[]>> {
    let error;
    let data;
    try{
        const response: AxiosResponse<PostType[]> = await apiClientNoAuth().get(postEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {
        error,
        data,
    };
}

async function register(newUser:UserType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try { 
        const response: AxiosResponse<UserType> = await apiClientNoAuth().post(
            userEndpoint,
            newUser
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong";
        }
    }
    return { 
        error,
        data,
    };
}

export {
    getAllPosts, 
    register
};
