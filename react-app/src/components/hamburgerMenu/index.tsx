import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../redux/store';
import HamburgerMenu from './view';
import { AppLoadAction, navigate } from '../../redux/app/actions';
import { AppState, AppNavigation, AppStateSuccess } from '../../redux/app/store';
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
        navigate: (navigation: AppNavigation) => {
            console.log('hmm');
            return dispatch(navigate(navigation));
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(HamburgerMenu);
