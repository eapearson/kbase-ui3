import {
    AsyncProcessState, UIError,
    ComponentStateNone, ComponentStateLoading, ComponentStateError, ComponentStateSuccess
} from "../store/common";
import { LoginOutlined } from "@ant-design/icons";

// Our own dynamic navigation (for now)
export type NavigationParams<K extends string> = { [key in K]: string };
export interface AppNavigation {
    view: string;
    params: NavigationParams<string>;
}

export interface AppSettings {
    showMenuLabels: boolean;
}

// Configuration for kbase-ui!
export interface AppConfig {
    baseUrl: string;
    services: {
        Groups: {
            url: string;
        };
        UserProfile: {
            url: string;
        };
        Workspace: {
            url: string;
        };
        ServiceWizard: {
            url: string;
        };
        Auth: {
            url: string;
        };
        NarrativeMethodStore: {
            url: string;
        };
        Catalog: {
            url: string;
        };
        NarrativeJobService: {
            url: string;
        };
        RelationEngine: {
            url: string;
        };
    };
    defaultPath: string;
}

export enum MenuPlace {
    SIDEBAR,
    HAMBURGER,
    LOGIN
}

export interface MenuLocationBase {
    place: MenuPlace;
}

export interface MenuLocationSidebar extends MenuLocationBase {
    place: MenuPlace.SIDEBAR;
}

export enum HamburgerMenuSection {
    MAIN,
    DEVELOPER,
    HELP
}

export interface MenuLocationHamburger extends MenuLocationBase {
    place: MenuPlace.HAMBURGER;
    section: HamburgerMenuSection;
}

export interface MenuLocationLogin extends MenuLocationBase {
    place: MenuPlace.LOGIN;
}

export type MenuLocation =
    MenuLocationSidebar |
    MenuLocationHamburger |
    MenuLocationLogin;

export enum ArgType {
    STRING,
    NUMBER
}

export interface ArgSpec {
    type: ArgType;
    isRequired: boolean;
    name: string;
}

export interface ParamSpec {
    key: string;
    name: string;
    type: ArgType;
}

// Sidebar menu.

export interface MenuItemBase {
    type: MenuItemType;
    id: string;
    icon: React.ReactNode;
    label: string;
    locations: Array<MenuLocation>;
}

export enum MenuItemType {
    VIEW,
    LINK
}

export interface MenuItemView extends MenuItemBase {
    type: MenuItemType.VIEW;
    isSelected: boolean;
    view: string;
    args: Array<ArgSpec>;
    params: Array<ParamSpec>;
}

export interface MenuItemLink extends MenuItemBase {
    type: MenuItemType.LINK;
    url: string;
    newWindow: boolean;
}

export type MenuItem = MenuItemView | MenuItemLink;


// export type SidebarMenu = Array<MenuItem>;
export type Menu = Array<MenuItem>;

// 
// export interface AppRuntime {
//     channelId: string | null;
//     hostChannelId: string | null;
//     devMode: boolean | null;
//     title: string;
//     navigation: Navigation
// }

// The App State itself.
export type AppStateNone = ComponentStateNone;
export type AppStateLoading = ComponentStateLoading;
export type AppStateError = ComponentStateError;

export interface AppView {
    title: string;
    config: AppConfig;
    navigation: AppNavigation;
    menu: Menu;
    settings: AppSettings;
}

export interface AppStateSuccess extends ComponentStateSuccess {
    view: AppView;
}

export type AppState =
    AppStateNone |
    AppStateLoading |
    AppStateError |
    AppStateSuccess;


// export interface AppStoreState {
//     app: {
//         status: AppState;
//         config: AppConfig;
//         runtime: AppRuntime;
//         error?: UIError;
//     };
// }

export interface AppStoreState {
    app: AppState;
}

export function makeInitialAppState(): AppStoreState {
    return {
        app: {
            loadingState: AsyncProcessState.INITIAL
        }
    };
}
