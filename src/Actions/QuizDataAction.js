import { quizDataConstants } from "../Constants";


export const addQuizData = (quizData) => {
    return (dispatch) => {
        dispatch({ type: quizDataConstants.ADD_QUIZ_DATA_REQUEST });
        dispatch({
            type: quizDataConstants.ADD_QUIZ_DATA_SUCCESS,
            payload: quizData
        });
    }
}
export const addQuizScore = (data) => {
    return (dispatch) => {
        dispatch({
            type: quizDataConstants.UPDATE_QUIZ_SCORE,
            payload: data
        });
    }
}