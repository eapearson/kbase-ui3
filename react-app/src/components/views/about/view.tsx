import React from 'react';
import { Col, Row } from 'antd';

export interface AboutProps {
    setTitle: (title: string) => void;
}

export interface AboutState {
}

export default class About extends React.Component<AboutProps, AboutState> {
    componentDidDMount() {
        this.props.setTitle('About KBase UI');
    }
    render() {
        return (
            <div>

                <Row>
                    <Col span={12}>
                        <h2>The KBase User Interface</h2>
                        <p>You are currently using the KBase User Interface (UI),
                        a collection of tools for KBase Users and Developers.</p>

                        <p>The UI is one of three primary web-based tools which comprise KBase:</p>
                        <ul>
                            <li>The <b>Narrative Interface</b>, a tool for creating, editing, running and publishing active scientific documents called Narratives. New to the Narrative? Perhaps you would like to check out the <a href="http://kbase.us/narrative-guide" target="_blank" rel="noopener noreferrer">Narrative Interface User Guide</a>.</li>
                            <li>The <a href="http://kbase.us" target="_blank" rel="noopener noreferrer">Documentation Site</a>, which provides tutorials and developer documentation, communications and publications, links to social media outlets, developer documentation, and background on KBase.</li>
                            <li>The UI, which provides login, account management, dashboard, catalog, data object viewing, and search services.</li>
                        </ul>
                    </Col>
                    <Col span={12}>
                        <h2>This Version</h2>
                        <p>This build is not currently located at a tagged commit. The current commit is <a href="https://github.com/kbase/kbase-ui/commit/ac8590b7dea76f3602a7afcb80cd518ceded8bb5" target="_blank" rel="noopener noreferrer">ac8590b7dea76f3602a7afcb80cd518ceded8bb5</a>.</p>

                        <p>It was built on Friday January 3, 2020 at 12:53:43 pm.</p>

                        <ul>
                            <li>
                                <a href="http://kbase.us/what-is-kbase/" target="_blank" rel="noopener noreferrer">About KBase</a>
                            </li>
                            <li>
                                <a href="http://kbase.us/contact-us" target="_blank" rel="noopener noreferrer">Contact KBase</a>
                            </li>
                            <li>
                                <a href="http://kbaseincubator.github.io/kbase-ui-docs" target="_blank" rel="noopener noreferrer">Documenation</a>
                            </li>
                            <li>
                                <a href="https://github.com/kbase/kbase-ui/tree/ac8590b7dea76f3602a7afcb80cd518ceded8bb5" target="_blank" rel="noopener noreferrer">Github Repo</a>
                            </li>
                            <li>
                                <a href="http://kbase.us/help-board/" target="_blank" rel="noopener noreferrer">Public Help Board</a>
                            </li>
                            <li>
                                <a href="https://github.com/kbase/kbase-ui/blob/ac8590b7dea76f3602a7afcb80cd518ceded8bb5/release-notes/index.md" target="_blank" rel="noopener noreferrer">Release Notes</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        );
    }
}