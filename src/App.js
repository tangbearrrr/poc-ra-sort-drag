import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import CustomList from './cms_language/CustomList';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
      dataProvider={dataProvider}
  >
    <Resource name="users" list={CustomList} />
  </Admin>
);

export default App;
