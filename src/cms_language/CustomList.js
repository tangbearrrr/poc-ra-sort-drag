import React from 'react';
import { List, TextField, EmailField, Datagrid } from 'react-admin';
import SortableDatagridBody from '../components/SortableDatagridBody';

const CustomList = props => {
    return (
        <List {...props} exporter={false} bulkActionButtons={false}>
            <Datagrid rowClick="edit" body={<SortableDatagridBody {...props} />}>
                <TextField source="name" />
                <EmailField source="email" />
            </Datagrid>
        </List>
    );
}

export default CustomList;