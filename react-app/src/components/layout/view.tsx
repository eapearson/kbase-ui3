import React from 'react';
import './style.less';
import Header from '../header';
import Sidebar from '../sidebar';
import Body from '../body';
import { AppStateSuccess } from '../../redux/app/store';

export interface LayoutProps {
    app: AppStateSuccess;
}

interface LayoutState {
}

export default class Layout extends React.Component<LayoutProps, LayoutState> {
    renderSidebar() {
        if (this.props.app.view.settings.showMenuLabels) {
            return <div className="Layout-sidebar" >
                <Sidebar />
            </div>;
        }
        return <div className="Layout-sidebar Layout-sidebar-no-labels">
            <Sidebar />
        </div>;
    }
    render() {
        return (
            <div className="Layout">
                <div className="Layout-header">
                    <Header />
                </div>
                <div className="Layout-content">
                    {this.renderSidebar()}
                    <div className="Layout-body">
                        <Body />
                    </div>
                </div>
            </div>
        );
    }
}