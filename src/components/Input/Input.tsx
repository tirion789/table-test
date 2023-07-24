import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { InputProps } from './Input.props';
import styles from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onChange, placeholder, icon, type = 'text', isDisabled, inputMod = 'text', className },
    ref
  ) => {
    const inputClassName = classNames(styles.container, className, isDisabled && styles.disabled);

    return (
      <div className={inputClassName}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          ref={ref}
          type={type}
          inputMode={inputMod}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
