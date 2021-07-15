import userDataReducer from "./userData.reducer";
import quizDataReducer from "./quizData.reducer";
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    userData: userDataReducer,
    QuizData: quizDataReducer
})
export default rootReducer;