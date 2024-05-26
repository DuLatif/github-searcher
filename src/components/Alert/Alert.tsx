import React from "react";
import styles from "./Alert.module.scss";
import { combineClasses } from "@/utils/styles";

export interface IAlertProps {
  color: "primary" | "success" | "danger" | "warning";
  message: string;
}
const Alert: React.FC<IAlertProps> = ({ color, message }) => {
  return <div className={combineClasses([styles.Alert, color])}>{message}</div>;
};

export default Alert;
