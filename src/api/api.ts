import {axi} from './axiosSetup';
import {AxiosResponse} from 'axios';

// Returns token which can be used to enter SMS code
export const enterPhone = async (phone: string): Promise<string> => {
  const response = await axi.post<
    {phone: string},
    AxiosResponse<{token: string}>
  >('/login/phone', {
    phone,
  });

  return response.data.token;
};

// Returns token which can be used to enter password
export const enterSmsCode = async (
  code: string,
  token: string,
): Promise<string> => {
  const response = await axi.post<
    {sms: string; token: string},
    AxiosResponse<{token: string}>
  >('/login/phone/validate', {
    sms: code,
    token,
  });

  return response.data.token;
};

// Returns token which can be used to get app grants
export const enterPassword = async (
  password: string,
  token: string,
): Promise<string> => {
  const response = await axi.post<
    {password: string},
    AxiosResponse<{
      token: string;
    }>
  >(
    '/password',
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.token;
};
