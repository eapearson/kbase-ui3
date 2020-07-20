import React from 'react';

export interface SigninProps {

}

export interface SigninState {

}

export default class Signin extends React.Component<SigninProps, SigninState> {
    renderSignin() {
        return (
            <div>
                This is signin!
            </div>
        );
    }
    render() {
        return this.renderSignin();
    }
}