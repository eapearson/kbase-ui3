import { UIError, ProcessState } from "../store/common";

// Auth state



export enum AuthenticationStatus {
    NONE = 0,
    UNAUTHENTICATED,
    AUTHENTICATED
}

export interface UserAuthentication {
    token: string;
    username: string;
    realname: string;
    roles: Array<string>;
}

// export interface Authentication {
//     status: AuthenticationStatus;
//     userAuthorization: UserAuthentication | null;
//     message: string;
// }

interface AuthenticationBase {
    status: AuthenticationStatus;
    process: ProcessState;
}

export interface AuthenticationNone extends AuthenticationBase {
    status: AuthenticationStatus.NONE;
}

export interface AuthenticationUnauthenticated extends AuthenticationBase {
    status: AuthenticationStatus.UNAUTHENTICATED;
}

export interface AuthenticationAuthenticated extends AuthenticationBase {
    status: AuthenticationStatus.AUTHENTICATED;
    authentication: UserAuthentication;
}

export interface AuthenticationError extends AuthenticationBase {
    status: AuthenticationStatus.NONE;
    error: UIError;
}

export type Authentication =
    AuthenticationNone |
    AuthenticationUnauthenticated |
    AuthenticationAuthenticated |
    AuthenticationError;

export interface AuthStoreState {
    auth: Authentication;
}

export function makeAuthStoreInitialState(): AuthStoreState {
    // return {
    //     auth: {
    //         status: AuthenticationStatus.NONE,
    //         process: ProcessState.NONE
    //     }
    // };
    return {
        auth: {
            status: AuthenticationStatus.AUTHENTICATED,
            process: ProcessState.NONE,
            authentication: {
                realname: 'Erik Pearson',
                username: 'eapearson',
                roles: [],
                token: "ABC123"
            }
        }
    };
    // return {
    //     auth: {
    //         status: AuthenticationStatus.UNAUTHENTICATED,
    //         process: ProcessState.NONE
    //     }
    // };
}
