import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, DatePicker, theme } from "antd";
import styles from "./Filter.module.scss";
const { Panel } = Collapse;
import addIcon from "../../assets/106230_add_icon.svg";
import tickIcon from "../../assets/tick.svg";
import deleteIcon from "../../assets/delete.svg";
import { Select } from "antd";

import { Input } from "antd";
import { filtersValues, columnValuesWithTypes } from "../../utils/dummyData";
type Props = {
  filters: any;
  setFilters: any;
  sort: any;
  setSorting: any;
};

export const Filter = ({ filters, setFilters, sort, setSorting }: Props) => {
  const { token } = theme.useToken();
  const [showFilterForm, setShowFilterForm] = React.useState(false);
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const filterFormHandler = (values: any) => {
    console.log(values);
    setShowFilterForm(false);
    if (values.filter === "sort") {
      setSorting({
        column: values.column,
        filter: "sort",
        value: values.value,
      });
      return;
    }
    let alreadyExists = filters.findIndex(
      (item: any) =>
        item.column === values.column && item.filter === values.filter
    );
    console.log(filters, alreadyExists);
    if (alreadyExists === -1) {
      return setFilters([...filters, values]);
    }
    const newFilters: any = filters.filter(
      (item: any) =>
        item.column !== values.column || item.filter !== values.filter
    );
    console.log(newFilters);
    return setFilters([...newFilters, values]);
    console.log(filters);
  };
  const filterDeleteHandler = (value: any) => {
    // if (value.filter === "sort") {
    //   const newSort = sort.filter((item) => item !== value);
    //   return setSorting(newSort);
    // }
    const newFilters = filters.filter((item) => item !== value);
    setFilters(newFilters);
  };
  return (
    <div className={styles.filterContainer}>
      <Collapse
        className={styles.collapse}
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
      >
        <Panel header="Filter" key="1" style={panelStyle}>
          <p>Filter</p>
          <ul className={styles.filterList}>
            {filters?.length !== 0 &&
              filters?.map((filter, index) => (
                <FilterItem
                  onDelete={filterDeleteHandler}
                  key={index}
                  value={filter}
                />
              ))}

            <FilterItem onDelete={filterDeleteHandler} value={sort} />
          </ul>
          {!showFilterForm && (
            <button onClick={() => setShowFilterForm(true)}>
              <img src={addIcon} alt="add" height={25} width={25} />
            </button>
          )}
          {showFilterForm && (
            <FilterForm columns={[]} onSubmit={filterFormHandler} />
          )}
        </Panel>
      </Collapse>
    </div>
  );
};
const FilterItem = ({
  value,
  onDelete,
}: {
  value: { column: string; filter: string; value: string };
  onDelete: (value: { column: string; filter: string; value: string }) => void;
}) => {
  const handleDelete = () => {
    onDelete(value);
  };
  return (
    <li>
      <span>{value.column}</span>
      <span>{value.filter}</span>
      {value?.value && <span>{value.value}</span>}
      {value.filter !== "sort" && (
        <button onClick={handleDelete}>
          <img src={deleteIcon} alt="add" height={25} width={25} />
        </button>
      )}
    </li>
  );
};
const FilterForm = ({
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
  const isSelectRequired = () => {
    if (filter === "sort") {
      return true;
    }
    return false;
  };
  const isDateRequired = () => {
    if (filter.startsWith("date")) {
      return true;
    }
  };
  return (
    <div className={styles.filterForm}>
      <Select
        id="column"
        defaultValue="select column"
        style={{ width: 120 }}
        onChange={handleColumnChange}
        placeholder="Select Column"
        options={columnValuesWithTypes}
      />
      <Select
        id="filter"
        defaultValue="select filter"
        style={{ width: 120 }}
        onChange={handleFilterChange}
        placeholder="Select Filter"
        options={filtersValues}
      />
      {isValueRequired() && !isDateRequired() && (
        <Input
          id="value"
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
          }}
          required={true}
          className={styles.valueInput}
          placeholder="Enter Value"
        />
      )}
      {isSelectRequired() && !isDateRequired() && (
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
      )}
      {isDateRequired() && (
        <DatePicker
          onChange={(e, d) => {
            console.log(e, d);
            setValue(d);
          }}
        />
      )}
      <button onClick={handleSubmit}>
        <img src={tickIcon} alt="add" height={25} width={25} />
      </button>
    </div>
  );
};
