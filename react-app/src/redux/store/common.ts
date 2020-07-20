import { JSONValue } from "./json";

export interface UIError {
    code: number;
    message: string;
    data?: JSONValue;
}

// export interface AppError {
//     code: string;
//     message: string;
//     generatedAt?: Date;
//     trace?: Array<string>;
//     errors?: Array<AppError>;
// }

export enum AsyncProcessState {
    INITIAL = 0,
    PROCESSING,
    SUCCESS,
    ERROR
}

export interface ComponentStateBase {
    loadingState: AsyncProcessState;
}

export interface ComponentStateNone extends ComponentStateBase {
    loadingState: AsyncProcessState.INITIAL;
}

export interface ComponentStateLoading extends ComponentStateBase {
    loadingState: AsyncProcessState.PROCESSING;
}

export interface ComponentStateError extends ComponentStateBase {
    loadingState: AsyncProcessState.ERROR;
    error: UIError;
}

export interface ComponentStateSuccess extends ComponentStateBase {
    loadingState: AsyncProcessState.SUCCESS;
}

export enum ProcessState {
    NONE = 0,
    PROCESSING,
    SUCCESS,
    ERROR
}