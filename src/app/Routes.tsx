import {FC, memo} from 'react';
import {Navigate, Route, Routes as ReactRoutes} from 'react-router-dom';

import {ROUTE__MAIN} from '@/constants';
import Auth from '@/pages/Auth';

const Routes: FC = () => {
  return (
    <ReactRoutes>
      <Route path={ROUTE__MAIN} element={<Auth />} />
      <Route path="*" element={<Navigate to={ROUTE__MAIN} replace />} />
    </ReactRoutes>
  );
};

export default memo(Routes);
