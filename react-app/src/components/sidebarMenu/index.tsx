import React from 'react';
import './style.less';
import { MenuItem, MenuItemType } from '../../redux/app/store';

export interface Props {
    menu: Array<MenuItem>;
    showLabels: boolean;
    onSelect: (menuID: string) => void;
}

interface State {
    menuItem: MenuItem | null;
    navigating: boolean;
}

export default class SidebarMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            menuItem: null,
            navigating: false
        };
    }
    renderMenuLabel(menuItem: MenuItem) {
        if (this.props.showLabels) {
            return <div className="SidebarMenu-label">{menuItem.label}</div>;
        }
    }
    //     <Icon
    //     type={menuItem.icon}
    //     className="SidebarMenu-icon"
    //     style={{ fontSize: '50px' }}
    // />
    renderMenu() {
        return this.props.menu.map((menuItem) => {
            const classNames = ['SidebarMenu-item'];
            if (menuItem.type === MenuItemType.VIEW && menuItem.isSelected) {
                classNames.push('SidebarMenu-selected');
            }
            return <div
                key={menuItem.id}
                className={classNames.join(' ')}
                onClick={() => {
                    this.props.onSelect(menuItem.id);
                }}
            >
                <span style={{ fontSize: '40px' }}>{menuItem.icon}</span>
                {this.renderMenuLabel(menuItem)}

            </div>;
        });
    }
    render() {
        // if (this.state.navigating) {
        //     this.setState({
        //         navigating: false
        //     });
        //     if (this.state.menuItem !== null) {
        //         switch (this.state.menuItem.type) {
        //             case null:
        //                 // continue
        //                 break;
        //             case MenuItemType.DASHBOARD:
        //                 return <Redirect to="/dashboard" />;
        //             case MenuItemType.ORGS:
        //                 return <Redirect to="/orgs" />;

        //         }
        //     }
        // }
        return <div className="SidebarMenu">
            {this.renderMenu()}
        </div>;
    }
}