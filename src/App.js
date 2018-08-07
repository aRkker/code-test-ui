

import React, { Component } from 'react';
import axios from 'axios';
import { DebitTable } from './components/DebitTable';
import socketIOClient from 'socket.io-client';


import './normalize.css';
import './ns-default.css';
import './ns-style-other.css';
import './App.css';

require('./notificationFx.js');


class App extends Component {

  state = {
    debitData: []
  }
  constructor(props, context) {
    super(props, context);

    this.socket = new socketIOClient(`${process.env.REACT_APP_NOTIFICATION_SERVER_ADDRESS}:${process.env.REACT_APP_NOTIFICATION_SERVER_PORT}`);

    this.socket.on('notification', (notificationData) => {
      var notification = new window.NotificationFx({
          message : '<div class="ns-thumb"><img style="width: 64px" src="/check.png"/></div><div class="ns-content"><p>' + notificationData.message + '</p></div>',
          layout : 'other',
          ttl : 6000,
          effect : 'thumbslider',
          type : 'success', // notice, warning, error or success
      });
      notification.show();
      // lets refresh the data cause we know now there's some new stuff in there
      this.getData();

    });


  
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
   // console.log(this);
    let debitData = await axios.get(`http://${process.env.REACT_APP_UI_SERVER_ADDRESS}:${process.env.REACT_APP_UI_SERVER_PORT}/getRows`);
    let debitDatas = [];
    for (let entry of debitData.data) {
      debitDatas.push(entry.ReturnedDebitItem);
    }
    this.setState({debitData: debitDatas});
    //console.log(this);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Financial Cloud code-test simple UI</h1>
        </header>
        <div className="App-intro">
          <DebitTable data={this.state.debitData} />
        </div>
      </div>
    );
  }
}

export default App;
