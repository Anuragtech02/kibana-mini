import React from "react";

type Props = { setFormData: any; formData: any; onSubmit: () => void };
import styles from "./Form.module.scss";
import { DatePicker } from "antd";
import { Input } from "antd";

export default function Form({ setFormData, formData, onSubmit }: Props) {
  const changeHandler = (e: any) => {
    console.log(e);
    setFormData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <form className={styles.form}>
        <h1>Welcome !</h1>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={changeHandler}
            required={true}
          />
          {/* <Input
            onChange={changeHandler}
            required={true}
            placeholder="Enter Name"
            value={formData.name}
          /> */}
        </div>
        <div>
          <DatePicker
            onChange={(e, d) =>
              changeHandler({
                target: {
                  name: "from",
                  value: d,
                },
              })
            }
          />
          <DatePicker
            onChange={(e, d) =>
              changeHandler({
                target: {
                  name: "to",
                  value: d,
                },
              })
            }
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
