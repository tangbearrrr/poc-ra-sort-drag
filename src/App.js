import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import LanguageList from './cms_language/languageList'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
      dataProvider={dataProvider}
  >
    <Resource name="users" list={LanguageList} />
  </Admin>
);

export default App;
