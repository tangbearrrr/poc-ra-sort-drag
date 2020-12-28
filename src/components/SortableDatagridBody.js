import * as React from 'react';
import { cloneElement, memo} from 'react';
import PropTypes from 'prop-types';
import { TableBody } from '@material-ui/core';
import classnames from 'classnames';
import { shallowEqual } from 'react-redux';
import { DatagridRow, PureDatagridRow } from 'react-admin';
import {
    SortableContainer,
    SortableElement,
} from 'react-sortable-hoc';

const SortableItem = SortableElement(props => {
    const {
        basePath,
        children,
        classes,
        className,
        data,
        expand,
        hasBulkActions,
        hover,
        ids,
        onToggleItem,
        resource,
        row,
        rowClick,
        rowStyle,
        selectedIds,
        isRowSelectable,
        ref,
        id,
        rowIndex
    } = props;

    return (
        cloneElement(
            row,
            {
                basePath,
                classes,
                className: classnames(classes.row, {
                    [classes.rowEven]: rowIndex % 2 === 0,
                    [classes.rowOdd]: rowIndex % 2 !== 0,
                    [classes.clickableRow]: rowClick,
                }),
                expand,
                hasBulkActions,
                hover,
                id,
                key: id,
                onToggleItem,
                record: data[id],
                resource,
                rowClick,
                selectable:
                    !isRowSelectable || isRowSelectable(data[id]),
                selected: selectedIds.includes(id),
                style: rowStyle ? rowStyle(data[id], rowIndex) : null,
            },
            children
        )
    );
})

const SortableTableBody = SortableContainer(props => {
    const {
        basePath,
        children,
        classes,
        className,
        data,
        expand,
        hasBulkActions,
        hover,
        ids,
        onToggleItem,
        resource,
        row,
        rowClick,
        rowStyle,
        selectedIds,
        isRowSelectable,
        ref,
        ...rest
    } = props;

    return (
        <TableBody
            ref={ref}
            className={classnames('datagrid-body', className)}
            {...rest}
        >
            {ids.map((id, rowIndex) =>
                <SortableItem
                    basePath={basePath}
                    children={children}
                    classes={classes}
                    className={className}
                    data={data}
                    expand={expand}
                    hasBulkActions={hasBulkActions}
                    hover={hover}
                    ids={ids}
                    onToggleItem={onToggleItem}
                    resource={resource}
                    row={row}
                    rowClick={rowClick}
                    rowStyle={rowStyle}
                    selectedIds={selectedIds}
                    isRowSelectable={isRowSelectable}
                    ref={ref}
                    id={id}
                    rowIndex={rowIndex}
                    key={id}
                    index={rowIndex}
                />
            )}
        </TableBody>
    );
});

const SortableDatagridBody = React.forwardRef(
    (
        {
            data,
            ...rest
        },
        ref
    ) => {
        const [items, setItems] = React.useState([]);

        const onSortEnd = ({ oldIndex, newIndex }) => {
            if (oldIndex !== newIndex) {
                const oldId = oldIndex + 1;
                const newId = newIndex +1;
                console.log(`Old:${oldIndex}, New:${newIndex}`);
                const srcItem = data[oldId];
                const destItem = data[newId];
                console.log(srcItem);
                console.log(destItem);
                data[newId] = srcItem;
                data[oldId] = destItem;
                setItems([]);
            }
        };

        return (
            <SortableTableBody
                data={data}
                ref={ref}
                onSortEnd={onSortEnd}
                {...rest}
            />
        );
    }
);

SortableDatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node,
    // @ts-ignore
    data: PropTypes.object.isRequired,
    // @ts-ignore
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    row: PropTypes.element,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    styles: PropTypes.object,
    isRowSelectable: PropTypes.func,
};

SortableDatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    row: <DatagridRow />,
};

// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
SortableDatagridBody.muiName = 'TableBody';

const areEqual = (prevProps, nextProps) => {
    const {
        children: _1,
        expand: _2,
        row: _3,
        ...prevPropsWithoutChildren
    } = prevProps;
    const {
        children: _4,
        expand: _5,
        row: _6,
        ...nextPropsWithoutChildren
    } = nextProps;
    return shallowEqual(prevPropsWithoutChildren, nextPropsWithoutChildren);
};

export const PureDatagridBody = memo(SortableDatagridBody, areEqual);

// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
PureDatagridBody.muiName = 'TableBody';
// @ts-ignore
PureDatagridBody.defaultProps = {
    row: <PureDatagridRow />,
};

export default SortableDatagridBody;
