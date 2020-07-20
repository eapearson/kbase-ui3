import React from 'react';
import "./style.less";

export interface Props {

}

interface State {

}

export default class Logo extends React.Component<Props, State> {
    renderLogo() {
        return (
            <img src="/kbase_logo.png" alt="KBase Logo" />
        )
    }

    render() {
        return <div className="Logo">
            {this.renderLogo()}
        </div>
    }
}