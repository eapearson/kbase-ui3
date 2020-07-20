import React from 'react';

export interface SettingsProps {

}

export interface SettingsState {

}

export default class Settings extends React.Component<SettingsProps, SettingsState> {
    renderSettings() {
        return (
            <div>
                This is settings!
            </div>
        );
    }
    render() {
        return this.renderSettings();
    }
}