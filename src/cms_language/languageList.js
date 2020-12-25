import React, { useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { List, TextField } from 'react-admin';
import { ListItem, ListItemText } from '@material-ui/core';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import arrayMove from "array-move";


const DragHandle = SortableHandle(() => (
    <ListItemIcon>
        <DragHandleIcon />
    </ListItemIcon>
));

const SortableItem = SortableElement(({ ...props }) => {
    return (
        <div style={{ margin: '1em' }}>
            {props.ids.map(id =>
                <ListItem>
                    <ListItemText
                        primary={<TextField record={props.data[id]} source="name" />}
                    />
                    <DragHandle />
                </ListItem>
            )}
        </div>
    )
})


const SortableListContainer = SortableContainer(({ ...props }) => (
    <List {...props}>
        <SortableItem />
    </List>
));

const SortableList = ({ ...props }) => {
    const [items, setItems] = useState([props.data]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(items => arrayMove(items, oldIndex, newIndex));
    };
    
    return (
        <SortableListContainer
            {...props}
            onSortEnd={onSortEnd}
            useDragHandle={true}
            lockAxis="y"
        />
    );
}

class LanguageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SortableList {...this.props} />
        );
    }
}

export default LanguageList;