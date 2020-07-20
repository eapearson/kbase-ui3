import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../redux/store';
import App from './view';
import { load, AppLoadAction, navigate } from '../../redux/app/actions';
import { AppState, AppView, AppNavigation, AppStateSuccess } from '../../redux/app/store';
import { ThunkDispatch } from 'redux-thunk';
import { Authentication } from '../../redux/auth/store';
import { AsyncProcessState } from '../../redux/store/common';

export interface OwnProps {
}

interface StateProps {
    app: AppStateSuccess;
    auth: Authentication;
}

interface DispatchProps {
    load: (view: AppView) => void;
    navigate: (navigation: AppNavigation) => void;
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    const {
        app, auth
    } = state;

    if (app.loadingState !== AsyncProcessState.SUCCESS) {
        throw new Error('Invalid state');
    }

    return {
        app,
        auth
    };


}

function mapDispatchToProps(dispatch: Dispatch<AppLoadAction> & ThunkDispatch<StoreState, void, AppLoadAction>, ownProps: OwnProps): DispatchProps {
    return {
        load: (view: AppView) => {
            return dispatch(load());
        },
        navigate: (navigation: AppNavigation) => {
            return dispatch(navigate(navigation));
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(App);
