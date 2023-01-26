import { Table } from "antd";
import React from "react";
import styles from "./TablePage.module.scss";
import { Filter } from "./Filter";
type Props = {
  formData: any;
  setSubmittedForm: any;
};

export default function TablePage({ formData, setSubmittedForm }: Props) {
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
      <Filter />
      <Table />
    </div>
  );
}
