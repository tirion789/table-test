import React from 'react';

import { TableCell } from '../TableCell';
import styles from './TableRow.module.scss';
import { TableRowProps } from './TableRow.props';

export const TableRow = ({ body, id, title }: TableRowProps) => {
  return (
    <tr className={styles.row}>
      <TableCell item={id} />
      <TableCell item={title} />
      <TableCell item={body} />
    </tr>
  );
};
