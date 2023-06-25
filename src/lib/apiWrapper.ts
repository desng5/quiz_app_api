import axios, { AxiosResponse } from "axios";
import PostType from "../types/post";
import UserType from "../types/auth";

const base = "https://cae-bookstore.herokuapp.com/";
const postEndpoint = "/posts";
const userEndpoint = "/users";

const apiClientNoAuth = () =>
  axios.create({
    baseURL: base,
  });

const apiClientBasicAuth = (username: string, password: string) =>
  axios.create({
    baseURL: base,
    headers: {
      Authorization: "Bearer " + btoa(username + ":" + password),
    },
  });

const apiClientTokenAuth = (token: string) =>
  axios.create({
    baseURL: base,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

type APIResponse<T> = {
  error: string | undefined;
  data: T | undefined;
};

type TokenType = {
  token: string;
  token_expiration: string;
};

async function getAllPosts(): Promise<APIResponse<PostType[]>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<PostType[]> = await apiClientNoAuth.get(
      postEndpoint
    );
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.message;
    } else {
      error = "Something went wrong";
    }
  }
  return {
    error,
    data,
  };
}

async function register(newUser: UserType): Promise<APIResponse<UserType>> {
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

async function login(
  username: string,
  password: string
): Promise<APIResponse<TokenType>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<TokenType> = await apiClientBasicAuth(
      username,
      password
    ).get("/token");
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

async function getMe(token: string): Promise<APIResponse<UserType>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<UserType> = await apiClientTokenAuth(
      token
    ).get("/me");
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

async function createPost(
  newPost: PostType,
  token: string
): Promise<APIResponse<PostType>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<PostType> = await apiClientTokenAuth(
      token
    ).post(postEndpoint, newPost);
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

async function deletePost(
  postId: number,
  token: string
): Promise<APIResponse<string>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<{ success: string }> =
      await apiClientTokenAuth(token).delete(postEndpoint + "/" + postId);
    data = response.data.success;
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

export { getAllPosts, register, login, getMe, createPost, deletePost };