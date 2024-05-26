import React, { useId } from "react";
import styles from "./Alert.module.scss";
import { combineClasses } from "@/utils/styles";

export interface IAlertProps {
  color: "primary" | "success" | "danger" | "warning";
  message: string;
}
const Alert: React.FC<IAlertProps> = ({ color, message }) => {
  const id = useId();
  return (
    <div id={id} className={combineClasses([styles.Alert, color])}>
      {message}
    </div>
  );
};

export default Alert;
