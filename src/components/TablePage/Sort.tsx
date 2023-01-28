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
import { SortForm } from "./SortForm";
const { Panel } = Collapse;

type Props = {
  sort: any;
  setSorting: any;
  columns: any;
};

export const Sort = ({ sort, setSorting, columns }: Props) => {
  const { token } = theme.useToken();
  const [showFilterForm, setShowFilterForm] = React.useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [localSort, setLocalSort] = useState<any>(sort);
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const filterFormHandler = (values: any) => {
    console.log(values);
    setButtonStatus(true);
    setSorting(localSort);
    return;
  };
  const filterChangeHandler = (values: any) => {
    setShowFilterForm(false);
    setButtonStatus(false);
    setLocalSort({
      column: values.column,
      filter: "sort",
      value: values.value,
    });
    console.log(values);
  };
  const filterDeleteHandler = (value: any) => {
    // if (value.filter === "sort") {
    //   const newSort = sort.filter((item) => item !== value);
    //   return setSorting(newSort);
    // }

    setSorting(null);
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
        <Panel header="Sort" key="1" style={panelStyle}>
          <div style={{ maxHeight: "300px" }}>
            <ul className={styles.filterList}>
              {localSort && (
                <FilterItem onDelete={filterDeleteHandler} value={localSort} />
              )}
              {!localSort && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={
                    <span>
                      No Sorts yet. Click on <b>New Sort</b> to add a new Sort
                    </span>
                  }
                >
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setShowFilterForm(true)}
                    type="primary"
                  >
                    New Sort
                  </Button>
                </Empty>
              )}
            </ul>

            {!showFilterForm && localSort && (
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
              <SortForm columns={columns} onSubmit={filterChangeHandler} />
            )}
            {localSort && (
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
