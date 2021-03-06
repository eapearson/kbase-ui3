import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../redux/store';
import App from './view';
import { load, AppLoadAction } from '../../redux/app/actions';
import { AppState, AppView } from '../../redux/app/store';
import { ThunkDispatch } from 'redux-thunk';

export interface OwnProps {
}

interface StateProps {
    app: AppState;
}

interface DispatchProps {
    load: () => void;
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    const {
        app
    } = state;

    return {
        app
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppLoadAction> & ThunkDispatch<StoreState, void, AppLoadAction>, ownProps: OwnProps): DispatchProps {
    return {
        load: () => {
            return dispatch(load());
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(App);