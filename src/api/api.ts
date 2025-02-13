import {AxiosResponse} from 'axios';

import {axi} from './axiosSetup';

const authPrefix = '/api/v0/auth';

// Phone number is passed without +7, just 10 digits
// Returns token which can be used to enter SMS code
export const enterPhone = async (phone: string): Promise<string> => {
  const response = await axi.post<
    {phone: string},
    AxiosResponse<{token: string}>
  >(`${authPrefix}/login/phone`, {
    // +7 пользователь не вводит, но на бэкенд 7-ку передавать надо
    phone: `7${phone}`,
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
  >(`${authPrefix}/login/phone/validate`, {
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
    `${authPrefix}/password`,
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

export const getGrants = async (
  appId: string,
  token: string,
): Promise<{
  isAlreadyGranted: boolean;
  grants: string[];
}> => {
  const response = await axi.get<{
    already_granted: boolean;
    grants: Array<{
      fields: Array<{
        value: string;
      }>;
    }>;
  }>('/api/oauth/authorize', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      app_id: appId,
    },
  });

  const data = response.data;
  const backendGrants = data.grants;

  return {
    isAlreadyGranted: data.already_granted,
    grants:
      Array.isArray(backendGrants) && backendGrants.length > 0
        ? backendGrants[0]!.fields.map(f => f.value)
        : [],
  };
};

export const getAuthCode = async (
  appId: string,
  token: string,
): Promise<string> => {
  const response = await axi.post<
    {
      app_id: string;
      confirm: boolean;
    },
    AxiosResponse<{
      auth_code: string;
    }>
  >(
    '/api/oauth/authorize',
    {
      app_id: appId,
      confirm: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.auth_code;
};
