import { USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS } from "./actionTypes"

export const userLoginSuccess = (payload) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload
    }
}

export const userLoginFailed = (payload) => {
    return {
        type: USER_LOGIN_FAILURE,
    }
}