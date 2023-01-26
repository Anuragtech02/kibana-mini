import React from "react";

type Props = { setFormData: any; formData: any; onSubmit: () => void };
import styles from "./Form.module.scss";
export default function Form({ setFormData, formData, onSubmit }: Props) {
  const changeHandler = (e: any) => {
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
        </div>
        <div>
          <input
            type="number"
            name="from"
            placeholder="from"
            value={formData.from}
            onChange={changeHandler}
            required={true}
          />
          <input
            type="number"
            name="to"
            placeholder="to"
            value={formData.to}
            onChange={changeHandler}
            required={true}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
