import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";

// Sub states
import { makeInitialAppState, AppStoreState } from '../app/store';
import { makeAuthStoreInitialState, AuthStoreState } from '../auth/store';

export interface StoreState extends AppStoreState, AuthStoreState { }

export function makeInitialStoreState(): StoreState {
    const appState = makeInitialAppState();
    const authState = makeAuthStoreInitialState();
    return {
        ...appState,
        ...authState
    };
}

export function createReduxStore() {
    return createStore(reducer, makeInitialStoreState(), compose(applyMiddleware(thunk)));
}