import {useContext} from 'react';
import {ContextProps, AuthDataContext} from './Context';

export const useAuthData = (): ContextProps => useContext<ContextProps>(AuthDataContext);
