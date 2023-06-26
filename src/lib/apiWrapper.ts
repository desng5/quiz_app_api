import axios, { AxiosResponse } from "axios";
import QuestionType from "../types/question";
import UserType from "../types/auth";

const base = "https://cae-bookstore.herokuapp.com";
const loginEndpoint = "/login";
const userEndpoint = "/user";
const questionEndpoint = "/question";
const allQuestions = "/question/all";

const apiClientNoAuth = () =>
  axios.create({
    baseURL: base,
  });

const apiClientBasicAuth = (username: string, password: string) =>
  axios.create({
    baseURL: base,
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
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

async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<{questions: QuestionType[]}> = await apiClientNoAuth().get(
      allQuestions
    );
    data = response.data.questions
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

async function register(newUser: UserType): Promise<APIResponse<UserType>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<UserType> = await apiClientNoAuth().post(
      userEndpoint,
      {
        email: newUser.email,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        password: newUser.password,
      }
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
  email: string,
  password: string
): Promise<APIResponse<UserType>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<UserType> = await apiClientBasicAuth(
      email,
      password
    ).get(loginEndpoint);
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

async function createQuestion(
  newQuestion: QuestionType,
  token: string
): Promise<APIResponse<QuestionType>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<QuestionType> = await apiClientTokenAuth(
      token
    ).post(questionEndpoint, newQuestion);
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

async function deleteQuestion(
  questionId: number,
  token: string
): Promise<APIResponse<string>> {
  let error;
  let data;
  try {
    const response: AxiosResponse<{ success: string }> =
      await apiClientTokenAuth(token).delete(
        questionEndpoint + "/" + questionId
      );
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

export {
  getAllQuestions,
  register,
  login,
  createQuestion,
  deleteQuestion,
};