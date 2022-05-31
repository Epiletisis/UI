import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options, errorMessage
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <select
          className={styles.input}
          id={id}
          onBlur={onChange}
          onChange={onChange}
          value={value}
        >
          {options.map((optionText) => (
            <option
              value={optionText[value]}
              key={optionText.key}
            >
              {optionText}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.displayErrors}>{errorMessage}</div>
    </label>
  </div>
);

export default FormItemDropdown;
