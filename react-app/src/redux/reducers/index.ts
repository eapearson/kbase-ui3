import { StoreState } from "../store";
import { Action, Reducer } from "redux";
import appReducer from '../app/reducers';

const reducer: Reducer<StoreState | undefined, Action> = (state: StoreState | undefined, action: Action) => {
    // Call sub-reducers here.

    // return the resulting new state after applying the appropriate reducer.

    //   const baseState = baseReducer(state as BaseStoreState, action);
    //   if (baseState) {
    //     return baseState as StoreState;
    //   }
    //   return state;
    return (
        appReducer(state, action) ||
        state
    )
};

export default reducer;