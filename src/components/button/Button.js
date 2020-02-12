import React from "react";
import styles from "./Button.module.css";

const Button = ({ onLoadMore }) => (
  <button className={styles.Button} onClick={onLoadMore}>
    Load More
  </button>
);

export default Button;
