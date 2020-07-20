import { StoreState } from '../store';
import {
    LoadLoading, LoadError, LoadSuccess, AppAction, SetTitle,
    SelectSidebarMenu, UpdateMenu
} from './actions';
import { AsyncProcessState } from '../store/common';
import { Reducer } from 'redux';
import { ActionType } from '../actions/ActionType';

function loadLoading(state: StoreState, action: LoadLoading): StoreState {
    return {
        ...state,
        app: {
            loadingState: AsyncProcessState.PROCESSING
        }
    };
}

function loadError(state: StoreState, action: LoadError): StoreState {
    return {
        ...state,
        app: {
            loadingState: AsyncProcessState.ERROR,
            error: action.error
        }
    };
}

function loadSuccess(state: StoreState, action: LoadSuccess): StoreState {
    return {
        ...state,
        app: {
            loadingState: AsyncProcessState.SUCCESS,
            view: action.view
        }
    };
}

function setTitle(state: StoreState, action: SetTitle): StoreState {
    console.log('setting title?');
    if (state.app.loadingState !== AsyncProcessState.SUCCESS) {
        return state;
    }
    return {
        ...state,
        app: {
            ...state.app,
            view: {
                ...state.app.view,
                title: action.title
            }
        }
    };
}

// function selectSidebarMenuItem(state: StoreState, action: SelectSidebarMenu): StoreState {
//     if (state.app.loadingState !== AsyncProcessState.SUCCESS) {
//         return state;
//     }
//     // console.log('sidebar menu?', sidebarMenu, typeof sidebarMenu, sidebarMenu instanceof Array);
//     const menu = state.app.view.sidebarMenu.map((item) => {
//         if (item.id === action.menuID) {
//             item.isSelected = true;
//         } else {
//             item.isSelected = false;
//         }
//         return item;
//     });
//     return {
//         ...state,
//         app: {
//             ...state.app,
//             view: {
//                 ...state.app.view,
//                 menu
//             }
//         }
//     };
// }

function updateMenu(state: StoreState, action: UpdateMenu): StoreState {
    if (state.app.loadingState !== AsyncProcessState.SUCCESS) {
        return state;
    }
    return {
        ...state,
        app: {
            ...state.app,
            view: {
                ...state.app.view,
                menu: action.newMenu
            }
        }
    };
}

const reducer: Reducer<StoreState | undefined, AppAction> = (state: StoreState | undefined, action: AppAction) => {
    if (!state) {
        return state;
    }
    switch (action.type) {
        case ActionType.APP_LOAD_PROCESSING:
            return loadLoading(state, action);
        case ActionType.APP_LOAD_ERROR:
            return loadError(state, action);
        case ActionType.APP_LOAD_SUCCESS:
            return loadSuccess(state, action);
        case ActionType.APP_SET_TITLE:
            return setTitle(state, action);
        // case ActionType.APP_SELECT_SIDEBAR_MENU:
        //     return selectSidebarMenuItem(state, action);
        case ActionType.APP_UPDATE_MENU:
            return updateMenu(state, action);
    }
};

export default reducer;
