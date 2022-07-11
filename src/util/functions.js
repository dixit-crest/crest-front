import CONSTANTS from "./constants";

export const logout = ( ) => {
    localStorage.removeItem(CONSTANTS.LOCAL_USER_DATA_KEY);
    return window.location.replace("/login")    
}

