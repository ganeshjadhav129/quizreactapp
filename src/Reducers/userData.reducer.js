import { loginConstants } from "../Constants";

const initState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    loading: false
}
export default (state = initState, action) => {
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                password: action.payload.password,
            }
            break;
    }
    return state;
};
