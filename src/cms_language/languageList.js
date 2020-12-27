import React, { useState, useEffect } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { List, TextField } from "react-admin";
import { ListItem, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import arrayMove from "array-move";

const DragHandle = SortableHandle(() => (
  <ListItemIcon>
    <DragHandleIcon />
  </ListItemIcon>
));

const SortableItem = SortableElement(({ ...props }) => {
  const { data, setItems } = props;
  console.log("SortableItem");

  useEffect(() => {
    const list = [];
    Object.keys(data).map((key) => {
      list.push({ id: data[key].id, text: data[key].name });
    });
    setItems(list);
  }, [data]);

  return (
    <div style={{ margin: "1em" }}>
      {props.ids.map((id) => (
        <ListItem>
          <ListItemText
            primary={<TextField record={props.data[id]} source="name" />}
          />
          <DragHandle />
        </ListItem>
      ))}
    </div>
  );
});

const SortableItem2 = SortableElement(({ text }) => {
  console.log("SortableItem2");

  return (
    <div style={{ margin: "1em" }}>
      <ListItem>
        <ListItemText primary={text} />
        <DragHandle />
      </ListItem>
    </div>
  );
});

const SortableListContainer = SortableContainer(({ ...props }) => {
  const { items } = props;
  console.log("items", items);
  console.log("props", props);

  return (
    <>
      {items.length ? (
        <List {...props}>
          <>
            {items.map(({ id, text }, index) => (
              <SortableItem2 key={id} index={index} text={text} />
            ))}
          </>
        </List>
      ) : (
        <List {...props}>
          <SortableItem {...props} />
        </List>
      )}
    </>
  );
});

const SortableList = ({ ...props }) => {
  const [items, setItems] = useState([]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log("oldIndex", oldIndex);
    console.log("newIndex", newIndex);
    console.log("onSortEnd items", items);
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <SortableListContainer
      {...props}
      items={items}
      setItems={setItems}
      onSortEnd={onSortEnd}
      useDragHandle={true}
      lockAxis="y"
    />
  );
};

class LanguageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <SortableList {...this.props} />;
  }
}

export default LanguageList;
