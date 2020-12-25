import React from 'react';
import { List, TextField, EditButton } from 'react-admin';
import { ListItem, ListItemText } from '@material-ui/core';

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
                        <EditButton resource="posts" basePath={this.props.basePath} record={this.props.data[id]} />
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
            <List {...this.props}>
                <TestGrid />
            </List>
        );
    }
}

export default LanguageList;