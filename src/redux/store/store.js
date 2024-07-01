import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import appReducer from '../reducers/reducer';


const rootReducer = combineReducers({
    app: appReducer,  //geral
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
