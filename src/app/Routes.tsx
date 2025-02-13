import {FC, memo} from 'react';
import {Navigate, Route, Routes as ReactRoutes} from 'react-router-dom';

import {
  ROUTE__ACCEPT_GRANTS_STEP,
  ROUTE__ENTER_CODE_STEP,
  ROUTE__ENTER_PASSWORD_STEP,
  ROUTE__ENTER_PHONE_STEP,
} from '@/constants';
import {AcceptGrantsStep} from '@/pages/AcceptGrantsStep';
import {EnterCodeStep} from '@/pages/EnterCodeStep';
import {EnterPasswordStep} from '@/pages/EnterPasswordStep';
import {EnterPhoneStep} from '@/pages/EnterPhoneStep';

const Routes: FC = () => {
  return (
    <ReactRoutes>
      <Route path={ROUTE__ENTER_PHONE_STEP} element={<EnterPhoneStep />} />
      <Route path={ROUTE__ENTER_CODE_STEP} element={<EnterCodeStep />} />
      <Route
        path={ROUTE__ENTER_PASSWORD_STEP}
        element={<EnterPasswordStep />}
      />
      <Route path={ROUTE__ACCEPT_GRANTS_STEP} element={<AcceptGrantsStep />} />
      <Route
        path="*"
        element={<Navigate to={ROUTE__ENTER_PHONE_STEP} replace />}
      />
    </ReactRoutes>
  );
};

export default memo(Routes);
