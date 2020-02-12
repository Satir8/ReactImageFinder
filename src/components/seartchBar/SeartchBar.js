import React from "react";
import styles from "./SeartchBar.module.css";

const SeartchBar = ({ onSubmit, value, onChange }) => (
  <header className={styles.Searchbar}>
    <form className={styles.SearchForm} onSubmit={e => onSubmit(e)}>
      <button type="submit" className={styles.SearchFormButton}>
        <span className={styles.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        value={value}
        onChange={e => onChange(e)}
        className={styles.SearchFormInput}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

export default SeartchBar;
