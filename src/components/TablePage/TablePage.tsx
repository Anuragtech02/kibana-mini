import { Button, Card, Divider, Input, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./TablePage.module.scss";
import { Filter } from "./Filter";
import { columnForTable, columnValues } from "../../utils/dummyData";
type Props = {};
import { DatePicker, Space } from "antd";
import { Sort } from "./Sort";
import { columnValuesWithTypes } from "./../../utils/dummyData";

const { RangePicker } = DatePicker;
export default function TablePage({}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    to: "",
  });

  const [filters, setFilters] = React.useState([]);
  const [sort, setSorting] = React.useState<any>(null);
  const [tableData, setTableData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [columnValues, setColumnValues] = React.useState([]);
  const fetchTableData = () => {
    const modifiedColumns = columns.map((item: any) => {
      return item.column;
    });
    const modifiedFilters = filters.map((item: any) => {
      return {
        cond: item.filter,
        value: item.value,
        column: item.column,
      };
    });

    let modifiedSort = null;
    if (sort?.column && sort?.value)
      modifiedSort = {
        column: sort?.column,
        asc: sort?.value === "asc",
      };
    const body = {
      columns: modifiedColumns,
      filters: modifiedFilters,
      sort: modifiedSort,
      skip: 0,
      limit: 0,
    };
    fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => setTableData(data.records))
      .catch((err) => console.log(err));
  };
  const fetchColumnValues = () => {
    fetch("http://localhost:8000/columns", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setColumns(data);
        setColumnValues(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchColumnValues();
  }, []);
  useEffect(() => {
    fetchTableData();
    console.log(columns);
  }, [columns]);
  useEffect(() => {
    fetchTableData();
    console.log(filters, sort);
  }, [sort, filters]);
  const changeHandler = (e: any) => {
    console.log(e);
    setFormData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleColumnChange = (value: string) => {
    console.log(value);
    const modifiedColumns = columns.filter((item: any) => {
      return value.includes(item.column);
    });
    setColumnValues(modifiedColumns);
  };
  const columnForTable = columnValues.map((item: any) => {
    return {
      title: item.column,
      dataIndex: item.column,
      key: item.column,
    };
  });
  return (
    <div className={styles.tablepage}>
      <Card title="Details">
        <div className={styles.navbar}>
          <div className={styles.inputContainer}>
            <Input
              onChange={changeHandler}
              required={true}
              placeholder="Enter Name"
              value={formData.name}
              name="name"
            />

            <RangePicker
              style={{ minWidth: "300px" }}
              onChange={(e, d) => {
                console.log(e, d);
                setFormData((prev: any) => {
                  return { ...prev, from: d[0], to: d[1] };
                });
              }}
            />
          </div>
          <Button onClick={fetchTableData} type="primary">
            Submit
          </Button>
        </div>
      </Card>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "stretch",
          gap: "15px",
        }}
      >
        <Filter
          columns={columnValues}
          filters={filters}
          setFilters={setFilters}
        />
        <Sort columns={columnValues} setSorting={setSorting} sort={sort} />
      </div>
      <Card>
        <p style={{ marginLeft: "3px" }}>Select Columns</p>
        <Select
          mode="tags"
          style={{ width: "100%", marginTop: "15px" }}
          placeholder="Tags Mode"
          onChange={handleColumnChange}
          options={columns?.map((item: any) => ({
            label: item.column,
            value: item.column,
          }))}
          value={columnValues?.map((item: any) => ({
            label: item.column,
            value: item.column,
          }))}
        />
        <Divider />
        <Table
          scroll={{ x: 1000 }}
          columns={columnForTable}
          dataSource={tableData}
          pagination={false}
        />
      </Card>
    </div>
  );
}
