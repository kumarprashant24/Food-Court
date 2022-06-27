import rootReducer from './reducers/index';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
const composeEnhancer = compose

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));
export default store;