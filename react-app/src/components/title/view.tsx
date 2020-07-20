import React from 'react';
import "./style.less";

export interface Props {
    title: string;
}

interface State {

}

export default class Title extends React.Component<Props, State> {
    renderTitle() {
        return (
            <h1 style={{ margin: '0' }}>
                {this.props.title}
            </h1>
        );
    }

    render() {
        return <div className="Title">
            {this.renderTitle()}
        </div>;
    }
}