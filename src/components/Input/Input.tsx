import React from "react";
import styles from "./Input.module.scss";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={styles.Input + " " + props.className}
    />
  );
});

export default Input;
