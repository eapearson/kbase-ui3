import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Cookies from 'es-cookie';
import { StoreState } from '../store';
import { AuthClient } from '@kbase/ui-lib';
import { UIError, AsyncProcessState } from '../store/common';

export enum AuthenticationActionType {
    // Authentication (supports log in)
    AUTHENTICATION_AUTHENTICATE = 'AUTHENTICATION_AUTHENTICATE',
    AUTHENTICATION_AUTHENTICATE_START = 'AUTHENTICATION_AUTHENTICATE_START',
    AUTHENTICATION_AUTHENTICATE_SUCCESS = 'AUTHENTICATION_AUTHENTICATE_SUCCESS',
    AUTHENTICATION_AUTHENTICATE_ERROR = 'AUTHENTICATION_AUTHENTICATE_ERROR',

    // Remove authentication (supports log out)
    AUTHENTICATION_REMOVE_AUTHENTICATION = 'AUTHENTICATION_REMOVE_AUTHENTICATION',
    AUTHENTICATION_REMOVE_AUTHENTICATION_START = 'AUTHENTICATION_REMOVE_AUTHENTICATION_START',
    AUTHENTICATION_REMOVE_AUTHENTICATION_ERROR = 'AUTHENTICATION_REMOVE_AUTHENTICATION_ERROR',
    AUTHENTICATION_REMOVE_AUTHENTICATION_SUCCESS = 'AUTHENTICATION_REMOVE_AUTHENTICATION_SUCCESS',

    // AUTHENTICATION_ADD_AUTHENTICATION = 'AUTHENTICATION_ADD_AUTHENTICATION',
    // AUTHENTICATION_AUTHENTICATION_ERROR = 'AUTHENTICATION_AUTHENTICATION_ERROR'
    // Check authentication (supports periodic check to ensure session token still valid)
    AUTHENTICATION_CHECK = 'AUTHENTICATION_CHECK',
    AUTHENTICATION_CHECK_START = 'AUTHENTICATION_CHECK_START',
    AUTHENTICATION_CHECK_ERROR = 'AUTHENTICATION_CHECK_ERROR',
}

// Action Types

// Authentication

export interface Authenticate extends Action {
    type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE;
    token: string;
}

export interface AuthenticateStart extends Action {
    type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_START;
}

export interface AuthenticateSuccess extends Action {
    type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_SUCCESS;
    token: string;
    username: string;
    realname: string;
    roles: Array<string>;
}

export interface AuthenticateError extends Action {
    type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_ERROR,
    error: UIError;
}

// Removing authentication.
export interface RemoveAuthentication extends Action {
    type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION;
}

export interface RemoveAuthenticationStart extends Action {
    type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_START;
}

export interface RemoveAuthenticationError extends Action {
    type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_ERROR,
    error: UIError;
}

export interface RemoveAuthenticationSuccess extends Action {
    type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_SUCCESS;
}


// Checking existing authentication

export interface Check extends Action {
    type: AuthenticationActionType.AUTHENTICATION_CHECK;
}

export interface CheckStart extends Action {
    type: AuthenticationActionType.AUTHENTICATION_CHECK_START;
}

export interface CheckError extends Action {
    type: AuthenticationActionType.AUTHENTICATION_CHECK_ERROR;
    error: UIError;
}

// Action Creators and Thunks

// Authentication

export function authenticate(token: string) {
    return async (dispatch: ThunkDispatch<StoreState, void, Action>, getState: () => StoreState) => {

        dispatch(authenticateStart);
        const {
            app
        } = getState();

        if (app.loadingState !== AsyncProcessState.SUCCESS) {
            throw new Error('App not yet loaded, should not get here');
        }

        const {
            config: {
                services: {
                    Auth: { url }
                }
            }
        } = app.view;

        // TODO: get auth info
        const auth = new AuthClient({ url: url });
        try {
            const [tokenInfo, account] = await Promise.all([auth.getTokenInfo(token), auth.getMe(token)]);
            const roles = account.roles.map(({ id, desc }) => id);
            Cookies.set('kbase_session', token);
            dispatch(authenticateSuccess(token, account.user, account.display, roles));
        } catch (ex) {
            console.error('authentication setup error', ex);
            dispatch(
                authenticateError({
                    code: 1,
                    message: ex.message
                })
            );
        }
    };
}

export function authenticateStart(): AuthenticateStart {
    return {
        type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_START
    };
}

export function authenticateError(error: UIError): AuthenticateError {
    return {
        type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_ERROR,
        error
    };
}

export function authenticateSuccess(
    token: string,
    username: string,
    realname: string,
    roles: Array<string>
): AuthenticateSuccess {
    return {
        type: AuthenticationActionType.AUTHENTICATION_AUTHENTICATE_SUCCESS,
        token,
        username,
        realname,
        roles
    };
}


// Removing authentication

export function removeAuthentication() {
    return (dispatch: ThunkDispatch<StoreState, void, Action>, getState: () => StoreState) => {
        dispatch(removeAuthenticationStart());
        // remove cookie
        Cookies.remove('kbase_session');

        // TODO: contact auth to remove token.

        // remove auth in state
        dispatch(removeAuthenticationSuccess());
    };
}

export function removeAuthenticationStart(): RemoveAuthenticationStart {
    return {
        type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_START
    };
}


export function removeAuthenticationError(error: UIError): RemoveAuthenticationError {
    return {
        type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_ERROR,
        error
    };
}

export function removeAuthenticationSuccess(): RemoveAuthenticationSuccess {
    return {
        type: AuthenticationActionType.AUTHENTICATION_REMOVE_AUTHENTICATION_SUCCESS
    };
}



// Checking authentication



// export function check() {
//     return (dispatch: ThunkDispatch<StoreState, void, Action>, getState: () => StoreState) => {
//         dispatch(checkStart());

//         const {
//             app
//         } = getState();

//         if (app.loadingState !== ComponentLoadingState.SUCCESS) {
//             throw new Error('App not yet loaded, should not get here');
//         }

//         const {
//             config: {
//                 services: {
//                     Auth: { url }
//                 }
//             }
//         } = app.view;

//         // TODO: get the auth from the kbase-ui integration api, perhaps a postmessage call

//         const token = Cookies.get('kbase_session');
//         if (!token) {
//             dispatch(removeAuthentication());
//             return;
//         }

//         const auth = new AuthClient({ url: url });

//         // Oh no, an orphan promise!
//         Promise.all([auth.getTokenInfo(token), auth.getMe(token)])
//             .then(([tokenInfo, account]) => {
//                 const roles = account.roles.map(({ id, desc }) => id);
//                 dispatch(authenticateSuccess(token, account.user, account.display, roles));
//             })
//             .catch((err) => {
//                 console.error('auth check error', err);
//                 dispatch(
//                     // TODO: develop numeric or string error codes...
//                     checkError({
//                         code: 1,
//                         message: err.message
//                     })
//                 );
//             });
//     };
// }

// export function checkStart(): AuthenticationCheckStart {
//     return {
//         type: AuthenticationActionType.AUTHENTICATION_CHECK_START
//     };
// }

// export function checkError(error: UIError): AuthenticationCheckError {
//     return {
//         type: AuthenticationActionType.AUTHENTICATION_CHECK_ERROR,
//         error
//     };
// }
