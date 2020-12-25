import React from 'react';
import { List, TextField, Datagrid } from 'react-admin';

const CustomList = props => {
    return (
        <List {...props} exporter={false} bulkActionButtons={false}>
            <Datagrid rowClick="edit">
                <TextField source="name" />
            </Datagrid>
        </List>
    );
}

export default CustomList;