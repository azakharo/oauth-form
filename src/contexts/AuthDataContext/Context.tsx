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

  password: string;
  setPassword: (value: string) => void;
}

export const AuthDataContext = createContext<ContextProps>({
  phone: '',
  setPhone: () => {},
  tokenToEnterSmsCode: '',
  setTokenToEnterSmsCode: () => {},
  code: '',
  setCode: () => {},
  password: '',
  setPassword: () => {},
});

export const AuthDataProvider: FC<PropsWithChildren> = ({children}) => {
  const [phone, setPhone] = useState('');
  const [tokenToEnterSmsCode, setTokenToEnterSmsCode] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const contextValue = useMemo(
    () => ({
      phone,
      setPhone,
      tokenToEnterSmsCode,
      setTokenToEnterSmsCode,
      code,
      setCode,
      password,
      setPassword,
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
    ],
  );

  return (
    <AuthDataContext.Provider value={contextValue}>
      {children}
    </AuthDataContext.Provider>
  );
};
