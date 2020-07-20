import { Action } from 'redux';
import { ActionType } from '../actions/ActionType';

import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../store';
import { UIError, AsyncProcessState } from '../store/common';
import {
    AppView, AppNavigation, Menu, AppConfig, MenuItemType,
    MenuPlace, AppSettings, ArgType, HamburgerMenuSection
} from './store';
import { JSONObject } from '../store/json';
import {
    SearchOutlined, DashboardOutlined, TeamOutlined, AppstoreOutlined,
    RocketOutlined, UserOutlined, NotificationOutlined, FileOutlined,
    CloudServerOutlined, MailOutlined, SettingOutlined, QuestionOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import React from 'react';


// App startup

// typing

// App loading.

export interface Load extends Action<ActionType.APP_LOAD> {
    type: ActionType.APP_LOAD;
}

export interface LoadLoading extends Action<ActionType.APP_LOAD_PROCESSING> {
    type: ActionType.APP_LOAD_PROCESSING;
}

export interface LoadSuccess extends Action<ActionType.APP_LOAD_SUCCESS> {
    type: ActionType.APP_LOAD_SUCCESS;
    view: AppView;
}

export interface LoadError extends Action<ActionType.APP_LOAD_ERROR> {
    type: ActionType.APP_LOAD_ERROR;
    error: UIError;
}

export type AppLoadAction =
    Load |
    LoadLoading |
    LoadSuccess |
    LoadError;


// generators and thunks

export interface PathChanged extends Action<ActionType.APP_PATH_CHANGED> {
    type: ActionType.APP_PATH_CHANGED,
    view: string;
    arguments: Array<string>;
    params: JSONObject;
}

// HHMM, we really need the menu to be generic, with a field to indicate which menu
// the item appears on... and we'll have to think about encoding the menu action
// into the menu item as well.
export interface UpdateMenu extends Action<ActionType.APP_UPDATE_MENU> {
    type: ActionType.APP_UPDATE_MENU,
    newMenu: Menu;
}

export function updateMenu(newMenu: Menu): UpdateMenu {
    return {
        type: ActionType.APP_UPDATE_MENU,
        newMenu
    };
}

export function pathChanged(view: string, args: Array<string>, params: JSONObject) {
    return async (dispatch: ThunkDispatch<StoreState, void, UpdateMenu>, getState: () => StoreState) => {
        const {
            app
        } = getState();

        if (app.loadingState !== AsyncProcessState.SUCCESS) {
            return;
        }

        // TODO: the menu should be more generic...
        const newMenu = app.view.menu.map((menuItem) => {
            if (menuItem.type === MenuItemType.VIEW) {
                if (menuItem.id === view) {
                    menuItem.isSelected = true;
                } else {
                    menuItem.isSelected = false;
                }
            }
            return menuItem;
        });
        dispatch(updateMenu(newMenu));
    };
}


export function load() {
    return async (dispatch: ThunkDispatch<StoreState, void, AppLoadAction>, getState: () => StoreState) => {
        dispatch(loadLoading());

        const config: AppConfig = {
            baseUrl: '',
            defaultPath: '',
            services: {
                Groups: {
                    url: '/services/groups'
                },
                UserProfile: {
                    url: '/services/user_profile/rpc'
                },
                Workspace: {
                    url: '/services/ws'
                },
                ServiceWizard: {
                    url: '/services/service_wizard'
                },
                Auth: {
                    url: '/services/auth'
                },
                NarrativeMethodStore: {
                    url: '/services/narrative_method_store/rpc'
                },
                Catalog: {
                    url: '/services/catalog/rpc'
                },
                NarrativeJobService: {
                    url: '/services/njs_wrapper'
                },
                RelationEngine: {
                    url: '/services/relation_engine_api'
                }
            }
        };
        const navigation: AppNavigation = {
            view: 'about',
            params: {}
        };
        const menu: Menu = [
            {
                type: MenuItemType.VIEW,
                id: 'dashboard',
                icon: React.createElement(DashboardOutlined),
                label: 'Dashboard',
                isSelected: true,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'dashboard',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'orgs',
                icon: React.createElement(TeamOutlined),
                label: 'Orgs',
                isSelected: false,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'orgs',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'catalog',
                icon: React.createElement(AppstoreOutlined),
                label: 'Catalog',
                isSelected: false,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'catalog',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'search',
                icon: React.createElement(SearchOutlined),
                label: 'Search',
                isSelected: false,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'search',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'jobs',
                icon: React.createElement(RocketOutlined),
                label: 'Jobs',
                isSelected: false,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'jobs',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'account',
                icon: React.createElement(UserOutlined),
                label: 'Account',
                isSelected: false,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'account',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'feeds',
                icon: React.createElement(NotificationOutlined),
                label: 'Feeds',
                isSelected: false,
                locations: [{ place: MenuPlace.SIDEBAR }],
                view: 'feeds',
                args: [],
                params: []
            },
            {
                type: MenuItemType.LINK,
                id: 'narrative',
                icon: React.createElement(FileOutlined),
                label: 'Narrative Interface',
                locations: [{ place: MenuPlace.SIDEBAR }],
                url: '/narrative',
                newWindow: true
            },
            {
                type: MenuItemType.VIEW,
                id: 'jgi-search',
                icon: React.createElement(SearchOutlined),
                label: 'JGI Search',
                isSelected: false,
                locations: [{ place: MenuPlace.HAMBURGER, section: HamburgerMenuSection.MAIN }],
                view: 'search',
                args: [],
                params: [{
                    key: 'tab',
                    name: 'Search Tab',
                    type: ArgType.STRING
                }]
            },
            {
                type: MenuItemType.VIEW,
                id: 'biochem-search',
                icon: React.createElement(SearchOutlined),
                label: 'BIOChem Search',
                isSelected: false,
                locations: [{ place: MenuPlace.HAMBURGER, section: HamburgerMenuSection.MAIN }],
                view: 'biochem-search',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'service-status',
                icon: React.createElement(CloudServerOutlined),
                label: 'Service Status',
                isSelected: false,
                locations: [{ place: MenuPlace.HAMBURGER, section: HamburgerMenuSection.DEVELOPER }],
                view: 'service-status',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'about',
                icon: React.createElement(InfoCircleOutlined),
                label: 'About',
                isSelected: false,
                locations: [{ place: MenuPlace.HAMBURGER, section: HamburgerMenuSection.HELP }],
                view: 'about',
                args: [],
                params: []
            },
            {
                type: MenuItemType.LINK,
                id: 'contact-kbase',
                icon: React.createElement(MailOutlined),
                label: 'Contact KBase',
                locations: [{ place: MenuPlace.HAMBURGER, section: HamburgerMenuSection.HELP }],
                url: 'https://kbase.us/contact-us',
                newWindow: true
            },
            {
                type: MenuItemType.LINK,
                id: 'help',
                icon: React.createElement(QuestionOutlined),
                label: 'Help!',
                locations: [{ place: MenuPlace.HAMBURGER, section: HamburgerMenuSection.HELP }],
                url: 'https://kbase.us/narrative-guide',
                newWindow: true
            },
            {
                type: MenuItemType.VIEW,
                id: 'profile',
                icon: React.createElement(UserOutlined),
                label: 'Your Profile',
                isSelected: false,
                locations: [{ place: MenuPlace.LOGIN }],
                view: 'profile',
                args: [],
                params: []
            },
            {
                type: MenuItemType.VIEW,
                id: 'settings',
                icon: React.createElement(SettingOutlined),
                label: 'Settings',
                isSelected: false,
                locations: [{ place: MenuPlace.LOGIN }],
                view: 'settings',
                args: [],
                params: []
            }

        ];
        const settings: AppSettings = {
            showMenuLabels: false
        };
        const view: AppView = {
            title: 'Welcome to KBase',
            navigation,
            config,
            menu,
            settings
        };

        // TODO: whatever we need to do during app startup...

        // 1. load config
        // 2. determine auth
        // 3. set up listener for route changes, so can update the menu.
        window.addEventListener('hashchange', (ev: HashChangeEvent) => {
            const hash = document.location.hash;
            const path = hash.substr(1).split('/').filter((pathElement) => {
                if (pathElement.length === 0) {
                    return false;
                }
                return true;
            });
            const view = path[0];
            let innerPath = {};
            if (path.length > 1) {
                innerPath = path.slice(1);
            }

            console.log('hash changed', view);

            // possibly handle additional processing here; 
            // e.g. if the hash has a query appended to it.
            dispatch(pathChanged(view, [], {}));
        });
        dispatch(loadSuccess(view));

        // TODO: throw error if need be
        // dispatch(loadError(someError))
    };
}

export function loadLoading(): LoadLoading {
    return {
        type: ActionType.APP_LOAD_PROCESSING
    };
}

export function loadSuccess(view: AppView): LoadSuccess {

    return {
        type: ActionType.APP_LOAD_SUCCESS,
        view
    };
}

export function loadError(error: UIError): LoadError {
    return {
        type: ActionType.APP_LOAD_ERROR,
        error
    };
}

// App Services

// Set the title

export interface SetTitle extends Action<ActionType.APP_SET_TITLE> {
    type: ActionType.APP_SET_TITLE;
    title: string;
}

export function setTitle(title: string): SetTitle {
    return {
        type: ActionType.APP_SET_TITLE,
        title
    };
}

// Navigation selection.

export interface SelectSidebarMenu extends Action<ActionType.APP_SELECT_SIDEBAR_MENU> {
    type: ActionType.APP_SELECT_SIDEBAR_MENU,
    menuID: string;
}

export function selectSidebarMenu(menuID: string): SelectSidebarMenu {
    return {
        type: ActionType.APP_SELECT_SIDEBAR_MENU,
        menuID
    };
}

// Navigation

export interface Navigate extends Action<ActionType.APP_NAVIGATE> {
    type: ActionType.APP_NAVIGATE,
    navigation: AppNavigation;
}

export function navigate(navigation: AppNavigation) {
    return async (dispatch: ThunkDispatch<StoreState, void, AppLoadAction>, getState: () => StoreState) => {
        // dispatch(loadLoading());

        // TODO: whatever we need to do during app startup...

        // 1. load config
        // 2. determine auth

        // dispatch(loadSuccess(view));

        // TODO: throw error if need be
        // dispatch(loadError(someError))
        // console.log('HERE?', navigation);
        switch (navigation.view) {
            case 'dashboard':
                document.location.hash = 'dashboard';
                break;
            case 'orgs':
                document.location.hash = 'orgs';
                break;
            case 'catalog':
                document.location.hash = 'catalog';
                break;
            case 'search':
                document.location.hash = 'search';
                break;
            case 'jobs':
                document.location.hash = 'jobs';
                break;
            case 'account':
                document.location.hash = 'account';
                break;
            case 'feeds':
                document.location.hash = 'feeds';
                break;
            default:
                console.log('default view', navigation.view);
                document.location.hash = `${navigation.view}`;
        }
    };
}
// All app actions

export type AppAction =
    AppLoadAction |
    SetTitle |
    SelectSidebarMenu |
    Navigate |
    PathChanged |
    UpdateMenu;
