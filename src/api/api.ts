import {axi} from './axiosSetup';
import {AxiosResponse} from 'axios';

const authPathPrefix = '/api/v0/auth';

// Returns token which can be used to enter SMS code
export const enterPhone = async (phone: string): Promise<string> => {
  const response = await axi.post<
    {phone: string},
    AxiosResponse<{token: string}>
  >(`${authPathPrefix}/login/phone`, {
    phone,
  });

  return response.data.token;
};

// Returns user token which can be used to enter password
export const enterSmsCode = async (
  code: string,
  token: string,
): Promise<string> => {
  const response = await axi.post<
    {sms: string; token: string},
    AxiosResponse<{employee: {token: string}}>
  >(`${authPathPrefix}/login/phone/validate`, {
    sms: code,
    token,
  });

  return response.data.employee.token;
};

// Returns access token for the logged-in user
export const enterPassword = async (
  password: string,
  userToken: string,
): Promise<string> => {
  const response = await axi.post<
    {password: string},
    AxiosResponse<{
      token: string;
    }>
  >(
    `${authPathPrefix}/password`,
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );

  return response.data.token;
};
