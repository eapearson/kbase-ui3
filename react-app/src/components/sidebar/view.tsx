import React from 'react';
import './style.less';
import SidebarMenu from '../sidebarMenu';
import { AppState, AppStateError, AppStateSuccess, MenuItem, AppNavigation, MenuLocation, MenuPlace } from '../../redux/app/store';
import app from '../app';
import { AsyncProcessState } from '../../redux/store/common';
import { Spin, Alert } from 'antd';

export interface Props {
    app: AppState;
    selectMenu: (menuID: string) => void;
    navigate: (navigation: AppNavigation) => void;
}

interface State {
    menu: Array<MenuItem>;
}

export default class Sidebar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    selectMenuItem(menuId: string) {
        // this.props.selectMenu(menuId);
        this.props.navigate({
            view: menuId,
            params: {}
        });
        // const updatedMenu = this.state.menu.map((menuItem) => {
        //     if (menuItem.id === menuId) {
        //         menuItem.isSelected = true;
        //     } else {
        //         menuItem.isSelected = false;
        //     }
        //     return menuItem;
        // });
        // this.setState({ menu: updatedMenu });
    }

    renderLoading() {
        return <Spin />;
    }

    renderError(app: AppStateError) {
        return <Alert type="error" message={app.error.message}></Alert>;
    }

    renderSuccess(app: AppStateSuccess) {
        const sidebarMenu = app.view.menu.filter((menuItem) => {
            return (menuItem.locations.some((menuLocation) => {
                return menuLocation.place === MenuPlace.SIDEBAR;
            }));
        });
        return <SidebarMenu
            menu={sidebarMenu}
            showLabels={app.view.settings.showMenuLabels}
            onSelect={this.selectMenuItem.bind(this)} />;
    }

    render() {
        const app = this.props.app;
        switch (app.loadingState) {
            case AsyncProcessState.INITIAL:
            case AsyncProcessState.PROCESSING:
                return this.renderLoading();
            case AsyncProcessState.ERROR:
                return this.renderError(app);
            case AsyncProcessState.SUCCESS:
                return this.renderSuccess(app);
        }
    }
}