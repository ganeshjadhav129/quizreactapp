import { quizDataConstants } from "../Constants";


const initState = {
    quizData: []
}
export default (state = initState, action) => {
    switch (action.type) {
        case quizDataConstants.ADD_QUIZ_DATA_REQUEST:
            state = {
                ...state
            }
            break;
        case quizDataConstants.ADD_QUIZ_DATA_SUCCESS:
            //state.quizData.push(action.payload)
            var newQuizData = state.quizData;
            newQuizData.push(action.payload)
            state = {
                ...state,
                quizData: newQuizData
            }
            break;
        case quizDataConstants.UPDATE_QUIZ_SCORE:
            var currentState = state.quizData;
            console.log("curr->", currentState);
            currentState.map((item, index) => {
                if (index == action.payload.quizIndex) {
                    item.quizScore = action.payload.score
                }
            });
            state = {
                ...state,
                quizData: currentState
            }
            break;
    }
    return state;
};
