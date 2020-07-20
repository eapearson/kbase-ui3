import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../../redux/store';
import Component from './view';
import { AppAction } from '../../../redux/app/actions';
import { ThunkDispatch } from 'redux-thunk';
import { setTitle } from '../../../redux/app/actions';

export interface OwnProps {
}

interface StateProps {
    // app: AppState;
}

interface DispatchProps {
    setTitle: (title: string) => void;
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    // const {
    //     app
    // } = state;

    // return {
    //     app
    // };
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<AppAction> & ThunkDispatch<StoreState, void, AppAction>, ownProps: OwnProps): DispatchProps {
    return {
        setTitle: (title: string) => {
            return dispatch(setTitle(title));
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Component);