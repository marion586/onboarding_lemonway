import axios from 'axios';
import type { AccountResponse, OnboardingResponse } from '~/types/onboarding';

export const useApi = () => {
  const config = useRuntimeConfig();
  let accessToken: string | null = null;

  // Token management
  const getStoredToken = () => process.client ? localStorage.getItem('lw_access_token') : null;
  const storeToken = (token: string) => process.client && localStorage.setItem('lw_access_token', token);
  const clearToken = () => process.client && localStorage.removeItem('lw_access_token');

  const authenticate = async () => {
    try {
      const response = await axios.post(
        `api/oauth/api/v1/oauth/token`,
        new URLSearchParams({ grant_type: 'client_credentials' }),
        {
          headers: {
            'Authorization': `Basic ${config.public.apiKey}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      accessToken = response.data.access_token;
      storeToken(accessToken as any);
      return accessToken;
    } catch (error) {
      clearToken();
      throw error;
    }
  };

  const getHeaders = async () => {
    accessToken = getStoredToken();
    if (!accessToken) await authenticate();
    return { Authorization: `Bearer ${accessToken}` };
  };


  const post = async <T>(url: string, body: any) => {
    try {
      const headers = await getHeaders();
      const response = await axios.post<T>(`${config.public.apiBaseUrl}${url}`, body, { headers });
      return response.data;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  };
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0, 
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  const createIndividualAccount = (data: any) => {
    console.log(data)
    return post<AccountResponse>('/accounts/individual', {
      individual: data.individual,
      profile: 'LENDER',
      walletId: generateUUID(),
      solutionName: 'lemonway'
    });
  };

  const createIndividualOnboarding = (accountId: string, data: any) => {
    return post<OnboardingResponse>('/onboardings/individual', {
      "redirectUrl": "lemonway.com",
      accountId,
      individual: data
    });
  };

  const createLegalEntityAccount = (data: any) => {
    return post<AccountResponse>('/accounts/legal-entity', {
      legalEntity: data.legalEntity,
      legalRepresentative: data.legalRepresentative,
      profile: 'PROJECT_HOLDER',
      walletId: generateUUID(),
      solutionName: 'lemonway'
    });
  };

  const createLegalEntityOnboarding = (accountId: string, data: any) => {
    return post<OnboardingResponse>(`/onboardings/${data.legalEntity.type.toLowerCase()}`, {
      "redirectUrl": "lemonway.com",
      accountId,
      ...data,
      
      
    });
  };

  return {
    createIndividualAccount,
    createIndividualOnboarding,
    createLegalEntityAccount,
    createLegalEntityOnboarding
  };
};
