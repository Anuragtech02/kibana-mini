import React, { useState } from "react";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Collapse, DatePicker, Divider, Tag, theme } from "antd";
import styles from "./Filter.module.scss";
const { Panel } = Collapse;
import addIcon from "../../assets/106230_add_icon.svg";
import tickIcon from "../../assets/tick.svg";
import deleteIcon from "../../assets/delete.svg";
import { Select } from "antd";

import { Input } from "antd";
import {
  columnValuesWithTypes,
  filtersDateValues,
  filtersNumberValues,
} from "../../utils/dummyData";
import { filtersStringValues } from "./../../utils/dummyData";
export const FilterForm = ({
  onSubmit,
  columns,
}: {
  onSubmit: (values: { column: string; filter: string; value: string }) => void;
  columns: [];
}) => {
  const [column, setColumn] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [value, setValue] = React.useState("");
  const handleColumnChange = (value: string) => {
    console.log(`selected ${value}`);
    setColumn(value);
  };
  const handleFilterChange = (value: string) => {
    console.log(`selected ${value}`);
    setFilter(value);
  };
  const handleValueChange = (value: string) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  const handleSubmit = () => {
    if (column.trim().length === 0 || filter.trim().length === 0) return;
    if (
      filter !== "not_null" &&
      filter !== "null" &&
      value.trim().length === 0
    ) {
      return;
    }
    onSubmit({ column, filter, value });
  };

  const isValueRequired = () => {
    if (filter === "not_null" || filter === "null" || filter === "sort") {
      return false;
    }
    return true;
  };

  const isDateRequired = () => {
    if (filter.startsWith("date")) {
      return true;
    }
  };
  const modifiedColumns = columns.map((columnValue: any) => ({
    label: columnValue.column,
    value: columnValue.column,
    type: columnValue.datatype,
  }));
  const optionsFordataType = (column: string) => {
    const columnObj: any = columns.find((item: any) => item.column === column);
    console.log("columnObj", columnObj);
    switch (columnObj?.datatype) {
      case "number":
        return filtersNumberValues;
      case "str":
        return filtersStringValues;
      case "date":
        return filtersDateValues;
      default:
        return [];
    }
  };
  const getDataType = (column: string) => {
    const columnObj: any = columns.find((item: any) => item.column === column);
    console.log("columnObj", columnObj);
    return columnObj?.datatype;
  };
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
        id="filter"
        defaultValue="select filter"
        style={{ width: 120 }}
        onChange={handleFilterChange}
        placeholder="Select Filter"
        options={optionsFordataType(column)}
      />
      <Divider
        type="horizontal"
        dashed
        style={{ minWidth: "10px", width: "30px", borderColor: "darkgrey" }}
      />
      {isValueRequired() && !isDateRequired() && (
        <Input
          id="value"
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
          }}
          type={getDataType(column) === "number" ? "number" : "text"}
          required={true}
          className={styles.valueInput}
          placeholder="Enter Value"
        />
      )}

      {isDateRequired() && (
        <DatePicker
          onChange={(e, d) => {
            console.log(e, d);
            setValue(d);
          }}
        />
      )}

      <Button
        type="text"
        icon={<CheckCircleOutlined />}
        onClick={handleSubmit}
      ></Button>
    </div>
  );
};
