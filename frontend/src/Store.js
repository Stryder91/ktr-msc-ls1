import { createStore } from 'redux';
import {loadState, saveState} from './components/LocalStorage';

// We are using browser memory to store our Authentication and Session Token
// -> JWT
const persistedState = loadState();

const initState = {
    titleHome: "Welcome to the App",
    access_token: null
}

const Store = (state = initState, action) => {
    if (action.type === 'SET_TOKEN') {
        const myNewState = {...state, access_token: action.tok};
        return myNewState;
    }
    return state
};
const store = createStore(Store, persistedState);

store.subscribe(() => {
    console.log("state updated", store.getState());
    saveState({
        access_token: store.getState().access_token,
    });
});
export default store;   