import { Table } from "antd";
import React, { useEffect } from "react";
import styles from "./TablePage.module.scss";
import { Filter } from "./Filter";
import { columnForTable, columnValues } from "../../utils/dummyData";
type Props = {
  formData: any;
  setSubmittedForm: any;
};

export default function TablePage({ formData, setSubmittedForm }: Props) {
  const [filters, setFilters] = React.useState([]);
  const [sort, setSorting] = React.useState({
    column: "id",
    filter: "sort",
    value: "asc",
  });
  const [tableData, setTableData] = React.useState([]);
  const fetchTableData = () => {
    const modifiedFilters = filters.map((item: any) => {
      return {
        cond: item.filter,
        value: item.value,
        column: item.column,
      };
    });
    const modifiedSort = {
      column: sort.column,
      asc: sort.value === "asc",
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
  return (
    <div className={styles.tablepage}>
      <div className={styles.navbar}>
        {Object.entries(formData).map((item: any) => {
          return (
            <div>
              {item[0]}: {item[1]}
            </div>
          );
        })}
        <button
          onClick={() => {
            setSubmittedForm(false);
          }}
        >
          Change
        </button>
      </div>
      <Filter
        filters={filters}
        setFilters={setFilters}
        setSorting={setSorting}
        sort={sort}
      />
      <div style={{ padding: "25px" }}>
        <Table
          columns={columnForTable}
          dataSource={tableData}
          pagination={false}
        />
      </div>
    </div>
  );
}
