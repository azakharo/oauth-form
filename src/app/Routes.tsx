import {FC, memo} from 'react';
import {Navigate, Route, Routes as ReactRoutes} from 'react-router-dom';

import {ROUTE__ENTER_PHONE_STEP} from '@/constants';
import {EnterPhoneStep} from '@/pages/EnterPhoneStep';

const Routes: FC = () => {
  return (
    <ReactRoutes>
      <Route path={ROUTE__ENTER_PHONE_STEP} element={<EnterPhoneStep />} />
      <Route path="*" element={<Navigate to={ROUTE__ENTER_PHONE_STEP} replace />} />
    </ReactRoutes>
  );
};

export default memo(Routes);
