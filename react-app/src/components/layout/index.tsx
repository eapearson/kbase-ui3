import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../redux/store';
import Component from './view';
import { load, AppLoadAction, selectSidebarMenu, AppAction, navigate } from '../../redux/app/actions';
import { AppState, AppView, AppNavigation, AppStateSuccess } from '../../redux/app/store';
import { ThunkDispatch } from 'redux-thunk';
import { AsyncProcessState } from '../../redux/store/common';

export interface OwnProps {
}

interface StateProps {
    app: AppStateSuccess;
}

interface DispatchProps {

}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    const {
        app
    } = state;

    if (app.loadingState !== AsyncProcessState.SUCCESS) {
        throw new Error('App not loaded');
    }

    return {
        app
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppLoadAction> & ThunkDispatch<StoreState, void, AppAction>, ownProps: OwnProps): DispatchProps {
    return {

    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Component);