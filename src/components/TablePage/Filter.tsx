import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import styles from "./Filter.module.scss";
const { Panel } = Collapse;
import addIcon from "../../assets/106230_add_icon.svg";
import tickIcon from "../../assets/tick.svg";
import deleteIcon from "../../assets/delete.svg";
import { Select } from "antd";

import { Input } from "antd";

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
      let alreadyExists = sort.findIndex(
        (item: any) => item.column === values.column
      );
      if (alreadyExists === -1) {
        return setSorting([...sort, values]);
      }
      const newSort = sort.filter((item) => item.column !== values.column);
      setSorting([...newSort, values]);
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
    if (value.filter === "sort") {
      const newSort = sort.filter((item) => item !== value);
      return setSorting(newSort);
    }
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
            {sort?.length !== 0 &&
              sort?.map((filter, index) => (
                <FilterItem
                  onDelete={filterDeleteHandler}
                  key={index}
                  value={filter}
                />
              ))}
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
      <button onClick={handleDelete}>
        <img src={deleteIcon} alt="add" height={25} width={25} />
      </button>
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
  const filtersValues = [
    {
      label: "not_null",
      value: "not_null",
    },
    {
      label: "null",
      value: "null",
    },
    {
      label: "text_contains",
      value: "text_contains",
    },
    {
      label: "text_not_contains",
      value: "text_not_contains",
    },
    {
      label: "text_starts_with",
      value: "text_starts_with",
    },
    {
      label: "text_ends_with",
      value: "text_ends_with",
    },
    {
      label: "text_equals",
      value: "text_equals",
    },
    {
      label: "greater_than",
      value: "greater_than",
    },
    {
      label: "greater_than_equal",
      value: "greater_than_equal",
    },
    {
      label: "less_than",
      value: "less_than",
    },
    {
      label: "less_than_equal",
      value: "less_than_equal",
    },
    {
      label: "equal",
      value: "equal",
    },
    {
      label: "not_equal",
      value: "not_equal",
    },
    {
      label: "is_between",
      value: "is_between",
    },
    {
      label: "date_is",
      value: "date_is",
    },
    {
      label: "date_greater_than",
      value: "date_greater_than",
    },
    {
      label: "date_less_than",
      value: "date_less_than",
    },
    {
      label: "sort",
      value: "sort",
    },
  ];
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
  return (
    <div className={styles.filterForm}>
      <Select
        id="column"
        defaultValue="select column"
        style={{ width: 120 }}
        onChange={handleColumnChange}
        placeholder="Select Column"
        options={[
          { value: "col1", label: "Col1" },
          { value: "col2", label: "Col2" },
          { value: "col3", label: "Col3" },
        ]}
      />
      <Select
        id="filter"
        defaultValue="select filter"
        style={{ width: 120 }}
        onChange={handleFilterChange}
        placeholder="Select Filter"
        options={filtersValues}
      />
      {isValueRequired() && (
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
      {isSelectRequired() && (
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

      <button onClick={handleSubmit}>
        <img src={tickIcon} alt="add" height={25} width={25} />
      </button>
    </div>
  );
};
