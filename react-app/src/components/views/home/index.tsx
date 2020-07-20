import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';

export interface HomeProps {

}

export interface HomeState {

}

export default class Home<HomeProps, HomeState> extends React.Component {
    render() {
        const test = [{
            id: '123',
            name: 'Foo'
        }, {
            id: '456',
            name: 'bar'
        }];
        return (
            <div>
                <p>Home! <HomeOutlined /></p>
                <Table dataSource={test}
                    rowKey="id"
                    rowSelection={{
                        type: "radio"
                    }}>
                    <Column title="ID" dataIndex='id' />
                    <Column title="Name" dataIndex="name" />
                </Table>
            </div>
        );
    }
}