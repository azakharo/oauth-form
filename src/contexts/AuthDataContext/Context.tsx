import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

export interface ContextProps {
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
}

export const AuthDataContext = createContext<ContextProps>({
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
});

export const AuthDataProvider: FC<PropsWithChildren> = ({children}) => {
  const [phone, setPhone] = useState('');
  const [tokenToEnterSmsCode, setTokenToEnterSmsCode] = useState('');
  const [code, setCode] = useState('');
  const [tokenToEnterPassword, setTokenToEnterPassword] = useState('');
  const [password, setPassword] = useState('');
  const [tokenToGetGrants, setTokenToGetGrants] = useState('');

  const contextValue = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  return (
    <AuthDataContext.Provider value={contextValue}>
      {children}
    </AuthDataContext.Provider>
  );
};
