import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RoutesMap } from '../../common/constans';
import { TablePage } from '../../pages/TablePage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={RoutesMap.MAIN} element={<TablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
