import React, { useState } from "react";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Collapse, DatePicker, Divider, Tag, theme } from "antd";
import styles from "./Filter.module.scss";
import { FilterForm } from "./FilterForm";
const { Panel } = Collapse;

export const FilterItem = ({
  value,
  onDelete,
}: {
  value: { column: string; filter: string; value: string };
  onDelete: (value: { column: string; filter: string; value: string }) => void;
}) => {
  const [usedColor, setUsedColor] = useState<string>("");
  const handleDelete = () => {
    onDelete(value);
  };
  const colors = [
    "#D01110",
    "#EF7C8E",
    "#16796F",
    "#189AB4",
    "#FA26A0",
    "#A45C40",
    "#C26DBC",
    "#76B947",
    "#FD7F20",
    "#658EA9",
    "#E98973",
    "#1F3541",
  ];
  // a function to get a unique random color from the colors array above

  const getRandomColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
  };

  const [color, setColor] = useState(getRandomColor());
  const handleColorChange = (event: any) => {
    console.log(event.target.value);
    setColor(event.target.value);
  };
  return (
    <li style={{ background: `${color}10`, borderColor: `${color}20` }}>
      <input
        value={color}
        className={styles.colorInput}
        type="color"
        onChange={handleColorChange}
      />
      <div className={styles.filterTags}>
        <Tag color={color}>{value.column}</Tag>
        {value?.filter !== "sort" && <Tag color={color}>{value.filter}</Tag>}
        {value?.value && <Tag color={color}>{value.value}</Tag>}
        <Button
          icon={<DeleteOutlined />}
          type="text"
          onClick={handleDelete}
        ></Button>
      </div>
    </li>
  );
};
