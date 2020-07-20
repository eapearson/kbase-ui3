import React from 'react';

// TODO: this is defined in rc-menu, but does not seem to be
// exposed by antd.
export interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}