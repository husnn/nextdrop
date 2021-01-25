import React from 'react';
import { Table } from 'antd';

import logIcon from '@platforms/react/assets/ic-log.svg';
import copyIcon from '@platforms/react/assets/ic-copy.svg';
import editIcon from '@platforms/react/assets/ic-edit.svg';
import trashIcon from '@platforms/react/assets/ic-trash.svg';

type IProps<T> = {
  data: any;
  columns: any;
  onClone(record: T): void;
  onEdit(record: any): void;
  onDelete(record: T): void;
}

export default class TableWithActions<T> extends React.Component<IProps<T>> {
  columns = [
    ...this.props.columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: T) => (
        <div className="table-row-actions">
          <img src={logIcon} height={16} onClick={() => this.props.onClone(record)} />
          <img src={copyIcon} height={16} onClick={() => this.props.onClone(record)} />
          <img src={editIcon} height={16} onClick={() => this.props.onEdit(record)} />
          <img src={trashIcon} height={16} onClick={() => this.props.onDelete(record)} />
        </div>
      )
    }
  ];

  render() {
    return(
      <Table
        pagination={false}
        columns={this.columns}
        dataSource={this.props.data}
      />
    );
  }
}