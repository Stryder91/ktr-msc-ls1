import { createStore } from 'redux';

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
const store = createStore(Store);

store.subscribe(() => {
    console.log("state updated", store.getState());
});
export default store;   