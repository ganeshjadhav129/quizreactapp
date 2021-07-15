import { loginConstants } from "../Constants";

export const signUp = (userData) => {
    return (dispatch) => {
        dispatch({ type: loginConstants.LOGIN_REQUEST });
        dispatch({
            type: loginConstants.LOGIN_SUCCESS,
            payload: userData
        });
    }
}