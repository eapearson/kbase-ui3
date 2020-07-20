import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {
    AppNavigation, AppStateSuccess, Menu as AppMenu, MenuPlace,
    HamburgerMenuSection, MenuItemType
} from '../../redux/app/store';
import { MenuInfo } from '../common';
import "./style.less";

export interface Props {
    app: AppStateSuccess;
    navigate: (navigation: AppNavigation) => void;
}

interface State {
}

export default class HamburgerMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            menuItem: null
        };
    }

    onMenuClick(param: MenuInfo) {
        // get the menu item.
        const menuItem = this.props.app.view.menu.find((menuItem) => {
            return (menuItem.id === param.key);
        });

        if (!menuItem) {
            return;
        }

        switch (menuItem.type) {
            case MenuItemType.VIEW:
                this.props.navigate({
                    view: menuItem.view,
                    params: {}
                });
                break;
            case MenuItemType.LINK:
                if (menuItem.newWindow) {
                    window.open(menuItem.url, '_blank');
                } else {
                    document.location.href = menuItem.url;
                }
        }
    }

    renderMenu(menu: AppMenu) {
        return menu.map((menuItem) => {
            return (
                <Menu.Item key={menuItem.id}>
                    {menuItem.icon}
                    {menuItem.label}
                </Menu.Item>
            );
        });
    }

    renderHamburgerMenu() {
        const mainMenu: AppMenu = [];
        const developerMenu: AppMenu = [];
        const helpMenu: AppMenu = [];

        this.props.app.view.menu.forEach((menuItem) => {
            menuItem.locations.forEach((location) => {
                if (location.place === MenuPlace.HAMBURGER) {
                    switch (location.section) {
                        case HamburgerMenuSection.MAIN:
                            mainMenu.push(menuItem);
                            break;
                        case HamburgerMenuSection.DEVELOPER:
                            developerMenu.push(menuItem);
                            break;
                        case HamburgerMenuSection.HELP:
                            helpMenu.push(menuItem);
                            break;
                    }
                }
            });
        });

        const menu = (
            <Menu onClick={this.onMenuClick.bind(this)}>
                {this.renderMenu(mainMenu)}
                <Menu.Divider />
                {this.renderMenu(developerMenu)}
                <Menu.Divider />
                {this.renderMenu(helpMenu)}
            </Menu>
        );
        return (
            <Dropdown
                overlay={menu}
                trigger={['click']}>
                <Button type="link">
                    <MenuOutlined style={{ fontSize: '150%' }} />
                </Button>
            </Dropdown>
        );
    }

    render() {
        return <div className="HamburgerMenu">
            {this.renderHamburgerMenu()}
        </div>;
    }
}
