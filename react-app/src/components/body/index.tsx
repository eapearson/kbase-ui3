import React from 'react';
import {
    Switch,
    Route,
    RouteComponentProps
} from 'react-router-dom';
import About from '../views/about';
import Home from '../views/home';
import Signin from '../views/signin';
import Plugin, { PluginProps } from '../views/plugin';
import Settings from '../views/settings';

export interface Props {

}

interface State {

}

export default class Body extends React.Component<Props, State> {
    render() {
        return <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/signin">
                <Signin />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>

            <Route path="/dashboard">
                <Plugin pluginID="dashboard" />
            </Route>
            <Route path="/orgs">
                <Plugin pluginID="orgs" />
            </Route>
            <Route path="/catalog">
                <Plugin pluginID="catalog" />
            </Route>
            <Route path="/search">
                <Plugin pluginID="search" />
            </Route>
            <Route path="/jobs">
                <Plugin pluginID="jobs" />
            </Route>
            <Route path="/account/:rest*"
                render={(props: RouteComponentProps<{ rest: string | undefined; }>) => {
                    // console.log('hmm', props);
                    return <Plugin pluginID="account" rest={props.match.params.rest} query={props.location.search} />;
                }}>

            </Route>
            <Route path="/feeds">
                <Plugin pluginID="feeds" />
            </Route>
            <Route path="/biochem-search">
                <Plugin pluginID="biochem-search" />
            </Route>
            <Route path="/dataview">
                <Plugin pluginID="dataview" />
            </Route>
            <Route path="/typeview">
                <Plugin pluginID="typeview" />
            </Route>
            <Route path="/jsonview">
                <Plugin pluginID="jsonview" />
            </Route>
            <Route path="/profile">
                <Plugin pluginID="profile" />
            </Route>
            <Route path="/service-status">
                <Plugin pluginID="service-status" />
            </Route>


            <Route path="/">
                <Home />
            </Route>
        </Switch>;
    }
}
