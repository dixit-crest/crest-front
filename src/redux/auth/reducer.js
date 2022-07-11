import CONSTANTS from "../../util/constants";
import { USER_LOGIN_FAILURE, USER_LOGIN_PENDING, USER_LOGIN_SUCCESS } from "./actionTypes";

const initialState = {
    id: null,
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    token: '',
    loading: true,
    ...JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_USER_DATA_KEY))
}

const authReducer = (state = {...initialState, ...JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_USER_DATA_KEY))} , action)  => {
    const { type, payload } = action

    switch (type) {
        case USER_LOGIN_PENDING:
            return { ...state, loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, ...payload }
        case USER_LOGIN_FAILURE:
            return { ...initialState, loading: false }

        default: return state
    }
}

export default authReducer