import React from 'react';

export interface IFrameProps {

}

interface IFrameState {

}

export default class IFrame extends React.Component<IFrameProps, IFrameState> {
    constructor(props: IFrameProps) {
        super(props);
    }

    renderIFrame() {
        return <iframe>

        </iframe>;
    }

    render() {
        return this.renderIFrame();
    }
}