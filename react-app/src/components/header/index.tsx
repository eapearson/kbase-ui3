import React from 'react';
import HamburgerMenu from '../hamburgerMenu';
import "./style.less";
import Logo from '../logo';
import Title from '../title';
import LoginMenu from '../loginMenu';

export interface Props {

}

interface State {

}

export default class Header extends React.Component<Props, State> {
    render() {
        return <React.Fragment>
            <div className="Header">
                <HamburgerMenu />
                <Logo />
                <Title />
                <LoginMenu />
            </div>
        </React.Fragment>;
    }
}