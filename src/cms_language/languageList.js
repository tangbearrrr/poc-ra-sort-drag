import React from 'react';
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { List, TextField, EditButton } from 'react-admin';
import { ListItem, ListItemText } from '@material-ui/core';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import arrayMove from "array-move";


const DragHandle = SortableHandle(() => (
    <ListItemIcon>
        <DragHandleIcon />
    </ListItemIcon>
));

const SortableItem = SortableElement(({ ...props }) => (
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
));

const SortableListContainer = SortableContainer(({ ...props }) => (
    <List {...props}>
        <SortableItem />
    </List>
));

// const onSortEnd = ({ oldIndex, newIndex }) => {
    
// };

class TestGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ margin: '1em' }}>
                {this.props.ids.map(id =>
                    <ListItem>
                        <ListItemText
                            primary={<TextField record={this.props.data[id]} source="name" />}
                        />
                        <DragHandle />
                    </ListItem>
                )}
            </div>
        );
    }
}

class LanguageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SortableListContainer 
                {...this.props} 
                // onSortEnd={onSortEnd}
                useDragHandle={true}
                lockAxis="y"
            />
        );
    }
}

export default LanguageList;