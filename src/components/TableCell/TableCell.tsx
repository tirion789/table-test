import React from 'react';

import styles from './TableCell.module.scss';
import { TableCellProps } from './TableCell.props';

export const TableCell = ({ item }: TableCellProps) => {
  return <td className={styles.cell}>{item}</td>;
};
