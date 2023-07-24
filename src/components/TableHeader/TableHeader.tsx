import React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import styles from './TableHeader.module.scss';
import { TableHeaderProps } from './TableHeader.props';

export const TableHeader = ({
  handleClickSortByTitle,
  idSort,
  bodySort,
  titleSort,
}: TableHeaderProps) => {
  const arrayTitles = [
    {
      title: 'ID',
      isSort: idSort,
      type: 'id',
    },
    {
      title: 'Заголовок',
      isSort: titleSort,
      type: 'title',
    },
    {
      title: 'Описание',
      isSort: bodySort,
      type: 'body',
    },
  ];

  return (
    <thead className={styles.container}>
      <tr className={styles.list}>
        {arrayTitles.map(({ title, isSort, type }) => (
          <th className={styles.item} key={title}>
            <Button onClick={() => handleClickSortByTitle(type)} label={title}></Button>
            <span className={classNames(!isSort && styles.selected)}>
              <ArrowIcon className={styles.animation_icon} />
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
