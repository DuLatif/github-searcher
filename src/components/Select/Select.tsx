import React from "react";
import styles from "./Select.module.scss";

export interface ISelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {}
const Select: React.FC<ISelectProps> = (props) => {
  return (
    <select {...props} className={styles.Select + " " + props.className} />
  );
};

export default Select;
