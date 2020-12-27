import React from 'react';
import { List, TextField, Datagrid } from 'react-admin';
import SortableDatagridBody from '../components/SortableDatagridBody';

const CustomList = props => {
    return (
        <List {...props} exporter={false} bulkActionButtons={false}>
            <Datagrid rowClick="edit" body={<SortableDatagridBody {...props} />}>
                <TextField source="name" />
            </Datagrid>
        </List>
    );
}

export default CustomList;