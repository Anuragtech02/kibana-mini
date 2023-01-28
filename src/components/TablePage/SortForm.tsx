import React, { useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, DatePicker, Divider, Tag, theme } from "antd";
import styles from "./Filter.module.scss";
import { Select } from "antd";

export const SortForm = ({
  onSubmit,
  columns,
}: {
  onSubmit: (values: { column: string; value: string }) => void;
  columns: any;
}) => {
  const [column, setColumn] = React.useState("");
  const [value, setValue] = React.useState("");
  const handleColumnChange = (value: string) => {
    console.log(`selected ${value}`);
    setColumn(value);
  };
  const handleValueChange = (value: string) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  const handleSubmit = () => {
    if (column.trim().length === 0) return;
    onSubmit({ column, value });
  };
  const modifiedColumns = columns.map((columnValue: any) => ({
    label: columnValue.column,
    value: columnValue.column,
  }));
  return (
    <div className={styles.filterForm}>
      <Select
        id="column"
        defaultValue="select column"
        style={{ width: 120 }}
        onChange={handleColumnChange}
        placeholder="Select Column"
        options={modifiedColumns}
      />
      <Divider
        type="horizontal"
        dashed
        style={{ minWidth: "10px", width: "30px", borderColor: "darkgrey" }}
      />

      <Select
        id="value"
        defaultValue="select value"
        style={{ width: 120 }}
        onChange={handleValueChange}
        placeholder="Select Value"
        options={[
          { value: "asc", label: "asc" },
          { value: "des", label: "des" },
        ]}
      />

      <Button
        type="text"
        icon={<CheckCircleOutlined />}
        onClick={handleSubmit}
      ></Button>
    </div>
  );
};
