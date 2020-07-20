import { Action, Reducer } from 'redux';
import { AuthenticationStatus } from './store';
import { StoreState } from '../store';
import {
    AuthenticateSuccess, AuthenticateStart, AuthenticateError, AuthenticationActionType,
    RemoveAuthenticationSuccess, RemoveAuthenticationStart, RemoveAuthenticationError
} from './actions';
import { ProcessState } from '../store/common';

// Authentication

export function authenticateStart(state: StoreState, action: AuthenticateStart): StoreState {
    return {
        ...state,
        auth: {
            status: AuthenticationStatus.NONE,
            process: ProcessState.PROCESSING
        }
    };
}

export function authenticateError(state: StoreState, action: AuthenticateError): StoreState {
    return {
        ...state,
        auth: {
            status: AuthenticationStatus.NONE,
            process: ProcessState.ERROR,
            error: action.error
        }
    };
}

export function authenticateSuccess(state: StoreState, action: AuthenticateSuccess): StoreState {
    return {
        ...state,
        auth: {
            status: AuthenticationStatus.AUTHENTICATED,
            process: ProcessState.SUCCESS,
            authentication: {
                token: action.token,
                username: action.username,
                realname: action.realname,
                roles: action.roles
            }
        }
    };
}

// Remove authentication

export function removeAuthenticationStart(state: StoreState, action: RemoveAuthenticationStart): StoreState {
    return {
        ...state,
        auth: {
            ...state.auth,
            process: ProcessState.PROCESSING
        }
    };
}

export function removeAuthenticationError(state: StoreState, action: RemoveAuthenticationError): StoreState {
    return {
        ...state,
        auth: {
            status: AuthenticationStatus.NONE,
            process: ProcessState.ERROR,
            error: action.error
        }
    };
}


export function removeAuthenticationSuccess(state: StoreState, action: RemoveAuthenticationSuccess): StoreState {
    return {
        ...state,
        auth: {
            status: AuthenticationStatus.UNAUTHENTICATED,
            process: ProcessState.SUCCESS
        }
    };
}

const reducer: Reducer<StoreState | undefined, Action> = (state: StoreState | undefined, action: Action) => {
    if (!state) {
        return state;
    }

    // function reducer(state: BaseStoreState, action: Action): BaseStoreState | null {
    switch (action.type) {
        case AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_START:
            return authenticateStart(state, action as AuthenticateStart);
        case AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_ERROR:
            return authenticateError(state, action as AuthenticateError);
        case AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_SUCCESS:
            return authenticateSuccess(state, action as AuthenticateSuccess);

        case AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_START:
            return removeAuthenticationStart(state, action as RemoveAuthenticationStart);
        case AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_ERROR:
            return removeAuthenticationError(state, action as RemoveAuthenticationError);
        case AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_SUCCESS:
            return removeAuthenticationSuccess(state, action as RemoveAuthenticationSuccess);
        default:
            return;
    }
};

export default reducer;



// export function authCheckStart(state: StoreState, action: AuthCheckStart): StoreState {
    //     return {
    //         ...state,
    //         auth: {
    //             status: AuthState.CHECKING,
    //             message: '',
    //             userAuthorization: {
    //                 token: '',
    //                 username: '',
    //                 realname: '',
    //                 roles: []
    //             }
    //         }
    //     };
    // }

    // export function authCheckError(state: StoreState, action: AuthCheckError): StoreState {
    //     return {
    //         ...state,
    //         auth: {
    //             status: AuthState.ERROR,
    //             message: action.error.message,
    //             userAuthorization: {
    //                 token: '',
    //                 username: '',
    //                 realname: '',
    //                 roles: []
    //             }
    //         }
    //     };
    // }