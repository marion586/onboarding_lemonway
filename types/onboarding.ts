// types/onboarding.ts
export interface IndividualAccountRequest {
  individual: {
    firstName: string;
    lastName: string;
    birthDate: string; // YYYY-MM-DD
    email: string;
    birthCountry: string; // ISO 3166-1 alpha-2
    nationalities: string[]; // ISO 3166-1 alpha-2[]
    address: {
      country: string; // ISO 3166-1 alpha-2
    };
  };
  redirectUrl: string;
  profile: 'LENDER';
  walletId: string;
  solutionName: string;
}

export interface LegalEntityAccountRequest {
  legalEntity: {
    name: string;
    type: 'COMPANY' | 'ASSOCIATION' | 'SOLE_TRADER';
    registrationNumber?: string;
    registrationCountry: string; // ISO 3166-1 alpha-2
    registrationDate?: string; // YYYY-MM-DD
  };
  legalRepresentative: {
    firstName: string;
    lastName: string;
    birthDate: string; // YYYY-MM-DD
    email: string;
    address: {
      country: string; // ISO 3166-1 alpha-2
    };
    birthCountry: string; // ISO 3166-1 alpha-2
    nationalities: string[]; // ISO 3166-1 alpha-2[]
  };
  profile: 'PROJECT_HOLDER';
  walletId: string;
  solutionName: string;
}

export interface OnboardingResponse {
  id: string;
  url: string;
  status: string;
}

export interface AccountResponse {
  id: string;
  status: string;
  walletId: string;
  profile: string;
  createdAt: string;
}