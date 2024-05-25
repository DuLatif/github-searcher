import React from "react";
import styles from "./Input.module.scss";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<IInputProps> = (props) => {
  return <input {...props} className={styles.Input + " " + props.className} />;
};

export default Input;
