export type AccountType = 'personal' | 'business';

export type RegistrationStep =
  | 'account-type'
  | 'mobile'
  | 'otp'
  | 'name'
  | 'password';

export interface RegistrationForm {
  accountType: AccountType;
  mobile: string;
  otp: string[];
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export type FieldErrors = Partial<Record<keyof RegistrationForm | 'otp', string>>;

export const STEP_ORDER: RegistrationStep[] = [
  'account-type',
  'mobile',
  'otp',
  'name',
  'password',
];

export const STEP_PROGRESS: Record<RegistrationStep, number> = {
  'account-type': 18,
  mobile: 36,
  otp: 54,
  name: 72,
  password: 90,
};
