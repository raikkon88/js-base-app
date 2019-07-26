import React, { Component } from 'react';
import AdminLTE, {Sidebar}from 'adminlte-2-react';
import Dashboard  from './dashboard.component';

const { Item } = Sidebar;

export default class Admin extends Component {

  sidebar = [
    <Item key="users" text="Users" to="/dashboard/users" />
  ]

  render() {
    return (
      <AdminLTE title={["Dashboard"]} titleShort={["Dh"]} theme="blue" sidebar={this.sidebar}>
        <Dashboard path="/dashboard"/>
      </AdminLTE>
    );
  }
}