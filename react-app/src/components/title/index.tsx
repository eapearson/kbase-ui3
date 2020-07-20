import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../redux/store';
import App from './view';
import { load, AppLoadAction } from '../../redux/app/actions';
import { AppState } from '../../redux/app/store';
import { ThunkDispatch } from 'redux-thunk';
import { AsyncProcessState } from '../../redux/store/common';

export interface OwnProps {
}

interface StateProps {
    title: string;
}

interface DispatchProps {
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    const {
        app
    } = state;

    if (app.loadingState !== AsyncProcessState.SUCCESS) {
        throw new Error('Should never get here...');
    }

    return {
        title: app.view.title
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppLoadAction> & ThunkDispatch<StoreState, void, AppLoadAction>, ownProps: OwnProps): DispatchProps {
    return {

    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(App);