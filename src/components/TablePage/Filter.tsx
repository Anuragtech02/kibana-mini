import React, { useState } from "react";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Collapse, DatePicker, Divider, Empty, Tag, theme } from "antd";
import styles from "./Filter.module.scss";
import { FilterForm } from "./FilterForm";
import { FilterItem } from "./Item";
const { Panel } = Collapse;

type Props = {
  filters: any;
  setFilters: any;
  columns: any;
};

export const Filter = ({ filters, setFilters, columns }: Props) => {
  const { token } = theme.useToken();
  const [showFilterForm, setShowFilterForm] = React.useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [localFilters, setLocalFilters] = useState<any>(filters);
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const filterFormHandler = () => {
    setButtonStatus(true);

    setFilters(() => {
      return localFilters;
    });
  };
  const getDataType = (column: string) => {
    console.log(columns, column);
    const columnData = columns.find((item: any) => item.column === column);
    return columnData?.datatype;
  };
  const filterChangeHandler = (values: any) => {
    console.log(values);
    setButtonStatus(false);
    setShowFilterForm(false);
    let alreadyExists = localFilters.findIndex(
      (item: any) =>
        item.column === values.column && item.filter === values.filter
    );
    console.log(filters, alreadyExists);
    if (alreadyExists === -1) {
      let correctValue = values.value;
      if (getDataType(values.column) === "number") {
        console.log(values);
        correctValue = parseInt(values.value);
      }
      return setLocalFilters([
        ...localFilters,
        { ...values, value: correctValue },
      ]);
    }
    const newFilters: any = localFilters.filter(
      (item: any) =>
        item.column !== values.column || item.filter !== values.filter
    );
    console.log(newFilters);
    let correctValue = values.value;
    if (getDataType(values.column) === "number") {
      correctValue = parseInt(values.value);
    }
    return setLocalFilters([
      ...newFilters,
      {
        ...values,
        value: correctValue,
      },
    ]);
  };
  const filterDeleteHandler = (value: any) => {
    // if (value.filter === "sort") {
    //   const newSort = sort.filter((item) => item !== value);
    //   return setSorting(newSort);
    // }
    const newFilters = localFilters.filter((item: any) => item !== value);
    setLocalFilters(newFilters);
    setButtonStatus(false);
  };
  return (
    <div className={styles.filterContainer}>
      <Collapse
        className={styles.collapse}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Filter" key="1" style={panelStyle}>
          <div style={{ maxHeight: "300px" }}>
            <ul className={styles.filterList}>
              {localFilters?.length !== 0 &&
                localFilters?.map((filter: any, index: number) => (
                  <FilterItem
                    onDelete={filterDeleteHandler}
                    key={index}
                    value={filter}
                  />
                ))}
              {localFilters?.length === 0 && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={
                    <span>
                      No filters applied. Click on <b>New Filter</b> to add a
                      new filter.
                    </span>
                  }
                >
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowFilterForm(true)}
                  >
                    New Filter
                  </Button>
                </Empty>
              )}
            </ul>
            {!showFilterForm && localFilters.length > 0 && (
              <Button
                style={{ marginTop: "15px" }}
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => setShowFilterForm(true)}
              >
                New Filter
              </Button>
            )}
            {showFilterForm && (
              <FilterForm columns={columns} onSubmit={filterChangeHandler} />
            )}
            {(localFilters.length > 0 || !buttonStatus) && (
              <div style={{ marginTop: "15px" }}>
                <Button
                  disabled={buttonStatus}
                  onClick={filterFormHandler}
                  type="primary"
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
