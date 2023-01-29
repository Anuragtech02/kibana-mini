import { Button, Card, Divider, Input, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./TablePage.module.scss";
import { Filter } from "./Filter";
import { columnForTable, columnValues } from "../../utils/dummyData";
type Props = {};
import { DatePicker, Space } from "antd";
import { Sort } from "./Sort";
import { columnValuesWithTypes } from "./../../utils/dummyData";
import VirtualTable from "../VirtualTable/VirtualTable";

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
  const [recordCount, setRecordCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [timeTake, setTimeTake] = React.useState(0);
  const fetchTableData = () => {
    const modifiedColumns = columnValues.map((item: any) => {
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
    setLoading(true);
    fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setTableData(data.records);
        setRecordCount(data.transcation.record_count);
        setTimeTake(data.transcation.time);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const fetchColumnValues = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
  }, [sort, filters, columnValues]);
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
  const getWidth = (column: string) => {
    const calculatedWidth = column.length * 10;
    if (calculatedWidth < 120) return 120;
    return calculatedWidth;
  };
  const columnForTable = columnValues.map((item: any) => {
    return {
      title: item.column,
      dataIndex: item.column,
      key: item.column,
      width: getWidth(item.column),
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ marginLeft: "3px" }}>
            <b>Select Columns</b>
          </p>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <p>
              <b>Record Count:</b> {recordCount}
            </p>
            <p>
              <b>Time Taken:</b> {timeTake} s
            </p>
          </span>
        </div>
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
        <VirtualTable
          loading={loading}
          scroll={{ y: 500 }}
          columns={columnForTable}
          dataSource={tableData}
          pagination={false}
        />
      </Card>
    </div>
  );
}
