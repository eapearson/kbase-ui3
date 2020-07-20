import React from 'react';
import Menu from 'antd/lib/menu';
import { Dropdown, Button, Tooltip, Avatar } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import "./style.less";
import {
    AppNavigation, Menu as AppMenu, MenuPlace,
    HamburgerMenuSection,
    AppState,
    AppStateSuccess
} from '../../redux/app/store';
import {
    Authentication, AuthenticationAuthenticated, AuthenticationUnauthenticated, AuthenticationStatus
} from '../../redux/auth/store';
import { LogoutOutlined, UserOutlined, LoginOutlined, DownOutlined } from '@ant-design/icons';
import { MenuInfo } from '../common';

export interface LoginMenuProps extends RouteComponentProps {
    auth: Authentication;
    app: AppStateSuccess;
    navigate: (navigation: AppNavigation) => void;
}

interface LoginMenuState {

}

class LoginMenu extends React.Component<LoginMenuProps, LoginMenuState> {

    onMenuClick(param: MenuInfo) {
        const menuItem = String(param.key);
        if (menuItem === 'signout') {
            alert('signout!');
        } else {
            this.props.navigate({
                view: menuItem,
                params: {}
            });
        }
    }

    renderMenu(menu: AppMenu) {
        return menu.map((menuItem) => {
            return (
                <Menu.Item key={menuItem.id}>
                    {menuItem.icon} {menuItem.label}
                </Menu.Item>
            );
        });
    }

    renderLoggedInMenu(auth: AuthenticationAuthenticated) {
        const mainMenu: AppMenu = [];

        this.props.app.view.menu.forEach((menuItem) => {
            menuItem.locations.forEach((location) => {
                if (location.place === MenuPlace.LOGIN) {
                    mainMenu.push(menuItem);
                }
            });
        });

        // const menu = (
        //     <Menu onClick={this.onMenuClick.bind(this)}>
        //         {this.renderMenu(mainMenu)}
        //         <Menu.Divider />
        //         {this.renderMenu(developerMenu)}
        //         <Menu.Divider />
        //         {this.renderMenu(helpMenu)}
        //     </Menu>
        // );

        const gravatarURL = "https://www.gravatar.com/avatar/be173a4408235829a61143d696b55a50?s=32&amp;amp;r=pg&amp;d=identicon";



        const menu = (
            <Menu onClick={this.onMenuClick.bind(this)}>
                {this.renderMenu(mainMenu)}

                <Menu.Divider />

                <Menu.Item key="signout">
                    <LogoutOutlined />Sign Out
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown
                overlay={menu}
                trigger={['click']}>
                <Button type="link">
                    <Avatar
                        src={gravatarURL} size="large" />
                    {' '}
                    <DownOutlined />
                </Button>
            </Dropdown>
        );
    }

    // renderLoggedInMenux(auth: AuthenticationAuthenticated) {
    //     const menu = (
    //         <Menu onClick={this.onMenuClick.bind(this)}>
    //             <Menu.Item key="profile">
    //                 <Icon type="user" /> Erik Pearson
    //             </Menu.Item>

    //             <Menu.Item key="settings">
    //                 <Icon type="setting" />Settings
    //             </Menu.Item>

    //             <Menu.Divider />

    //             <Menu.Item key="signout">
    //                 <Icon type="logout" />Sign Out
    //             </Menu.Item>
    //         </Menu>
    //     );

    //     return (
    //         <Dropdown
    //             overlay={menu}
    //             trigger={['click']}>
    //             <Button type="link">
    //                 <Icon type="user" style={{ fontSize: "150%" }} />
    //             </Button>
    //         </Dropdown>
    //     );
    // }

    doSigninClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();
        // console.log('hmm');
        // this.props.history.push('/signin');
        // window.history.pushState(null, 'Signin', '/signin');
        // document.location.href = '/signin';
    }

    renderLoginMenu(auth: AuthenticationUnauthenticated) {
        return (
            <Tooltip title="Sign In" style={{ whiteSpace: 'nowrap' }} placement="left">
                <Button type="link" onClick={this.doSigninClick.bind(this)}>
                    <LoginOutlined style={{ fontSize: "150%" }} />
                </Button>
            </Tooltip>
        );
    }

    renderNone() {
        return <div>NONE</div>;
    }

    renderState() {
        const auth = this.props.auth;
        switch (auth.status) {
            case (AuthenticationStatus.NONE):
                return this.renderNone();
            case (AuthenticationStatus.AUTHENTICATED):
                return this.renderLoggedInMenu(auth);
            case (AuthenticationStatus.UNAUTHENTICATED):
                return this.renderLoginMenu(auth);
        }
    }

    render() {
        return <div className="LoginMenu">
            {this.renderState()}
        </div>;
    }
}

export default withRouter<LoginMenuProps, any>(LoginMenu);