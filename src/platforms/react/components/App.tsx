import React from 'react';
import { Tabs, Typography } from 'antd';

import './App.scss';

import Swarm from './Swarm';
import Profiles from './Profiles';

const { Title } = Typography;
const { TabPane } = Tabs;

type IProps = {}
type IState = {}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  
  render() {
    return(
      <div id="app">
        <div id="container">
          <Title style={{ paddingTop: 48 }}>NextDrop</Title>
          <Tabs style={{ marginTop: 32 }} defaultActiveKey="swarm">
            <TabPane tab="Swarm" key="swarm">
              <Swarm />
            </TabPane>
            <TabPane tab="Profiles" key="profiles">
              <Profiles />
            </TabPane>
            <TabPane tab="Cards" key="paymentCards">
              
            </TabPane>
          </Tabs>
          </div>
      </div>
    );
  }
}