import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../redux/store';
import Component from './view';
import { load, AppLoadAction, selectSidebarMenu, AppAction, navigate } from '../../redux/app/actions';
import { AppState, AppNavigation } from '../../redux/app/store';
import { ThunkDispatch } from 'redux-thunk';

export interface OwnProps {
}

interface StateProps {
    app: AppState;
}

interface DispatchProps {
    selectMenu: (menuID: string) => void;
    navigate: (navigation: AppNavigation) => void;
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    const {
        app
    } = state;

    return {
        app
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppLoadAction> & ThunkDispatch<StoreState, void, AppAction>, ownProps: OwnProps): DispatchProps {
    return {
        selectMenu: (menuID: string) => {
            return dispatch(selectSidebarMenu(menuID));
        },
        navigate: (navigation: AppNavigation) => {
            return dispatch(navigate(navigation));
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Component);