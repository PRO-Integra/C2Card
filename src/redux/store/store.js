import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import appReducer from '../reducers/reducer';
import funcionarioReducer from '../reducers/reducerApi';

const rootReducer = combineReducers({
    app: appReducer,  //geral
    funcionario: funcionarioReducer, //api
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
