import React from "react";
import { Spin, Alert } from "antd";
import { HashRouter } from 'react-router-dom';

import Layout from '../layout';
import { AppState, AppStateError, AppStateSuccess } from "../../redux/app/store";

import { AsyncProcessState } from "../../redux/store/common";

import "./style.css";



export interface AppProps {
    app: AppState;
    load: () => void;
}

interface State { }

export default class App extends React.Component<AppProps, State> {
    componentDidMount() {
        this.props.load();
    }

    renderLoading() {
        return <Spin />;
    }

    renderError(app: AppStateError) {
        return <Alert
            type="error"
            message={app.error.message} />;
    }

    renderSuccess(app: AppStateSuccess) {
        return <HashRouter>
            <Layout />
        </HashRouter>;
    }

    render() {
        const app = this.props.app;
        switch (app.loadingState) {
            case AsyncProcessState.INITIAL:
            case AsyncProcessState.PROCESSING:
                return this.renderLoading();
            case AsyncProcessState.SUCCESS:
                return this.renderSuccess(app);
            case AsyncProcessState.ERROR:
                return this.renderError(app);
        }
    }
}
