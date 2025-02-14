import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

export interface ContextProps {
  appId: string;
  setAppId: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  tokenToEnterSmsCode: string;
  setTokenToEnterSmsCode: (value: string) => void;

  code: string;
  setCode: (value: string) => void;

  tokenToEnterPassword: string;
  setTokenToEnterPassword: (value: string) => void;

  password: string;
  setPassword: (value: string) => void;

  tokenToGetGrants: string;
  setTokenToGetGrants: (value: string) => void;

  redirectUrl: string;
  setRedirectUrl: (value: string) => void;
  redirectStateParam: string;
  setRedirectStateParam: (value: string) => void;
}

export const AuthDataContext = createContext<ContextProps>({
  appId: '',
  setAppId: () => {},
  phone: '',
  setPhone: () => {},
  tokenToEnterSmsCode: '',
  setTokenToEnterSmsCode: () => {},
  code: '',
  setCode: () => {},
  tokenToEnterPassword: '',
  setTokenToEnterPassword: () => {},
  password: '',
  setPassword: () => {},
  tokenToGetGrants: '',
  setTokenToGetGrants: () => {},
  redirectUrl: '',
  setRedirectUrl: () => {},
  redirectStateParam: '',
  setRedirectStateParam: () => {},
});

export const AuthDataProvider: FC<PropsWithChildren> = ({children}) => {
  const [appId, setAppId] = useState('');
  const [phone, setPhone] = useState('');
  const [tokenToEnterSmsCode, setTokenToEnterSmsCode] = useState('');
  const [code, setCode] = useState('');
  const [tokenToEnterPassword, setTokenToEnterPassword] = useState('');
  const [password, setPassword] = useState('');
  const [tokenToGetGrants, setTokenToGetGrants] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [redirectStateParam, setRedirectStateParam] = useState('');

  const contextValue = useMemo(
    () => ({
      appId,
      setAppId,
      phone,
      setPhone,
      tokenToEnterSmsCode,
      setTokenToEnterSmsCode,
      code,
      setCode,
      tokenToEnterPassword,
      setTokenToEnterPassword,
      password,
      setPassword,
      tokenToGetGrants,
      setTokenToGetGrants,
      redirectUrl,
      setRedirectUrl,
      redirectStateParam,
      setRedirectStateParam,
    }),
    [
      appId,
      setAppId,
      phone,
      setPhone,
      code,
      setCode,
      password,
      setPassword,
      tokenToEnterSmsCode,
      setTokenToEnterSmsCode,
      tokenToEnterPassword,
      setTokenToEnterPassword,
      tokenToGetGrants,
      setTokenToGetGrants,
      redirectUrl,
      setRedirectUrl,
      redirectStateParam,
      setRedirectStateParam,
    ],
  );

  return (
    <AuthDataContext.Provider value={contextValue}>
      {children}
    </AuthDataContext.Provider>
  );
};
