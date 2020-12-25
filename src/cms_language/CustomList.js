import React from 'react';
import { List, TextField } from 'react-admin';
import CustomDatagrid from '../components/CustomDatagrid';

const CustomList = props => {
    return (
        <List {...props} exporter={false} bulkActionButtons={false}>
            <CustomDatagrid rowClick="edit">
                <TextField source="name" />
            </CustomDatagrid>
        </List>
    );
}

export default CustomList;