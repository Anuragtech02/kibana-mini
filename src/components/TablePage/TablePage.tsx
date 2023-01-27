import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./TablePage.module.scss";
import { Filter } from "./Filter";
import { columnForTable, columnValues } from "../../utils/dummyData";
type Props = {};
import { DatePicker, Space } from "antd";

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
  const fetchTableData = () => {
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
      columns: columnValues,
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
  useEffect(() => {
    fetchTableData();
  }, []);
  useEffect(() => {
    fetchTableData();
  }, [sort, filters]);
  const changeHandler = (e: any) => {
    console.log(e);
    setFormData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
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
      <Filter
        filters={filters}
        setFilters={setFilters}
        setSorting={setSorting}
        sort={sort}
      />
      <Card>
        <Table
          columns={columnForTable}
          dataSource={tableData}
          pagination={false}
        />
      </Card>
    </div>
  );
}
