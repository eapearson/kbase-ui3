import React from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../../redux/store";
import App from '../app'
import "./style.css";

const store = createReduxStore();

export interface RootProps { }

export interface RootState { }

export default class Root<RootProps, RootState> extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
