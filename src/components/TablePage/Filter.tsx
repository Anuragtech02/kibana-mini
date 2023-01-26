import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import styles from "./Filter.module.scss";
const { Panel } = Collapse;
import addIcon from "../../assets/106230_add_icon.svg";
import tickIcon from "../../assets/tick.svg";
import { Select } from "antd";

type Props = {};

export const Filter = (props: Props) => {
  const { token } = theme.useToken();
  const [filters, setFilters] = React.useState([]); //
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
    setFilters([...filters, values]);
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
    onSubmit({ column, filter, value });
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
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
        ]}
      />
      <Select
        id="filter"
        defaultValue="select filter"
        style={{ width: 120 }}
        onChange={handleFilterChange}
        placeholder="Select Filter"
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
        ]}
      />
      <Select
        id="value"
        defaultValue="select value"
        style={{ width: 120 }}
        onChange={handleValueChange}
        placeholder="Select Value"
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
        ]}
      />

      <button onClick={handleSubmit}>
        <img src={tickIcon} alt="add" height={25} width={25} />
      </button>
    </div>
  );
};
