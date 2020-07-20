import React from 'react';
import './style.less';
import IFrame from './IFrame';

export interface PluginProps {
    pluginID: string;
    rest?: string;
    query?: string;
}

export interface PluginState {
}

export default class Plugin extends React.Component<PluginProps, PluginState> {
    path?: Array<string>;
    params?: Map<string, string>;
    constructor(params: PluginProps) {
        super(params);
        console.log('params?', params);

        if (params.rest) {
            this.path = params.rest.split('/').map((element) => {
                return element.trim();
            });
            if (this.path.length === 1 && this.path[0] === '') {
                this.path = [];
            }
        }

        if (params.query) {
            this.params = params.query.slice(1).split('&')
                .reduce((query, field) => {
                    const [key, value] = field.split('=');
                    query.set(key, value);
                    return query;
                }, new Map<string, string>());
        }
    }

    renderPlugin() {
        return (
            <div className="Plugin">
                <p>This is a plugin? {this.props.pluginID}, with path {this.path ? this.path.join(',') : 'none'}</p>
                <IFrame />
            </div>
        );
    }

    render() {
        return this.renderPlugin();
    }
}