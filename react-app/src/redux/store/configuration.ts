// Let's start simple, even though we know there is a lot to it...

// The top level config object.

export interface AppConfig {
    coreServices: CoreServices;
    buildInfo: BuildInformation;
    release: ReleaseInformation;
    featureSwitches: FeatureSwitches;
    uiServices: UIServices;
    deployment: DeploymentInformation;
    resources: Resources;
}

// Core services

export enum ServiceType {
    JSONRPC11,
    JSONRPC20,
    REST
}

export interface ServiceVersion {
    method: string;
    versionPath: string;
    minimumVersion: string;
}

export interface CoreService {
    name: string;
    path: string;
    moduleName: string;
    type: ServiceType;
    version: ServiceVersion;
}

export interface CoreServices {
    auth: CoreService,
    catalog: CoreService,
    feeds: CoreService,
    groups: CoreService,
    narrativeMethodStore: CoreService,
    profile: CoreService,
    serviceWizard: CoreService,
    relationEngine: CoreService,
    narrativeJobService: CoreService,
    search: CoreService,
    workspace: CoreService;
}

// Build Info

export interface BuildInformation {
    target: string;
    git: GitInformation;
    builtAt: number;
}

export interface GitInformation {
    commitHash: string;
    commitAbbreviatedHash: string;
    authorName: string;
    authorDate: number;
    committerName: string;
    committerDate: number;
    reflogSelector: string;
    subject: string;
    commitNotes: string;
    originalURL: string;
    branch: string;
    tag: string;
    version: string | null;
}

// Release Info

export type SemanticVersion = string;

export interface ReleaseInformation {
    version: SemanticVersion;
}

// Feature Switches

export type FeatureSwitchID = string;

export interface FeatureSwitch {
    id: FeatureSwitchID;
    title: string;
    description: string;
}

export interface FeatureSwitches {
    available: Array<FeatureSwitch>;
    enabled: Array<FeatureSwitchID>;
    disabled: Array<FeatureSwitchID>;
}

// UI Services

export interface UIServices {
    session: SessionServiceConfig;
    route: RouteServiceConfig;
    heartbeat: HeartbeatServiceConfig;
    connection: ConnectionServiceConfig;
    coreServiceMonitoring: CoreServiceMonitoringConfig;
    notification: NotificationServiceConfig;
    userProfile: UserProfileServiceConfig;
    feeds: FeedsServiceConfig;
    menu: MenuServiceConfig;
}

export interface SessionServiceConfig {
    cookie: {
        maxAge: number;
        name: string;
        backup: {
            name: string;
            domain: string | null;
            enabled: boolean;
        };
    },
    monitoring: {
        interval: number;
    };
}

export interface RouteServiceConfig {
    defaultRoute: string;
}

export interface HeartbeatServiceConfig {
    interval: number;
}

export interface ConnectionServiceConfig {
}

export interface CoreServiceMonitoringConfig {
}

export interface NotificationServiceConfig {
}

export interface UserProfileServiceConfig {
}

export interface FeedsServiceConfig {
}

export interface MenuServiceConfig {
}

// Deployment

// export type DeploymentEnvironment =
//     'ci' |
//     'next' |
//     'prod' |
//     'narrative-dev' |
//     'narrative-refactor'; 

export interface DeploymentInformation {
    id: string;
    targetDirectory: string;
    environment: string;
    icon: string;
    name: string;
}

// Resources

export interface Resource {
    url: string;
    name: string;
}

export interface Resources {
    documentation: {
        login: Resource,
        narrative: Resource,
        tutorials: Resource,
        apps: Resource,
        troubleshooting: Resource,
        aboutKBase: Resource;
    },
    help: Resource,
    contact: Resource,
    statusPage: Resource,
    submitJIRATicket: Resource,
}