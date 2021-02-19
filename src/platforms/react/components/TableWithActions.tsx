import React from "react";
import { Table } from "antd";

import copyIcon from "@platforms/react/assets/ic-copy.svg";
import editIcon from "@platforms/react/assets/ic-edit.svg";
import trashIcon from "@platforms/react/assets/ic-trash.svg";

type IProps<T> = {
  rowSettings?: any;
  data: any;
  columns: any;
  onClone(record: T): void;
  onEdit(record: T): void;
  onDelete(record: T): void;
};

export default class TableWithActions<T> extends React.Component<IProps<T>> {
  columns = [
    ...this.props.columns,
    {
      title: "Actions",
      key: "actions",
      render: (_: string, record: T) => (
        <div className="table-row-actions">
          <img
            src={copyIcon}
            height={16}
            onClick={() => this.props.onClone(record)}
          />
          <img
            src={editIcon}
            height={16}
            onClick={() => this.props.onEdit(record)}
          />
          <img
            src={trashIcon}
            height={16}
            onClick={() => this.props.onDelete(record)}
          />
        </div>
      ),
    },
  ];

  render() {
    return (
      <Table
        {...this.props.rowSettings}
        pagination={false}
        columns={this.columns}
        dataSource={this.props.data}
      />
    );
  }
}
