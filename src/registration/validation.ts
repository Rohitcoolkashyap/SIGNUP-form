import type { FieldErrors, RegistrationForm, RegistrationStep } from './types';

const NAME_MIN_LENGTH = 3;
const NAME_PATTERN = /^[a-zA-Z][a-zA-Z\s'-]{2,38}$/;
const MOBILE_PATTERN = /^\d{10}$/;
const OTP_PATTERN = /^\d{4}$/;

export function isStepValid(step: RegistrationStep, form: RegistrationForm): boolean {
  return Object.keys(validateStep(step, form)).length === 0;
}

export function validateStep(
  step: RegistrationStep,
  form: RegistrationForm
): FieldErrors {
  switch (step) {
    case 'account-type':
      return form.accountType ? {} : { accountType: 'Select an account type' };
    case 'mobile':
      if (!form.mobile.trim()) {
        return { mobile: 'Mobile number is required' };
      }
      if (!MOBILE_PATTERN.test(form.mobile.replace(/\s/g, ''))) {
        return { mobile: 'Enter a valid 10-digit mobile number' };
      }
      return {};
    case 'otp': {
      const code = form.otp.join('');
      if (!OTP_PATTERN.test(code)) {
        return { otp: 'Enter the 4-digit OTP' };
      }
      return {};
    }
    case 'name': {
      const errors: FieldErrors = {};
      const first = form.firstName.trim();
      const last = form.lastName.trim();
      if (!first) {
        errors.firstName = 'First name is required';
      } else if (first.length < NAME_MIN_LENGTH) {
        errors.firstName = 'First name must be at least 3 characters';
      } else if (!NAME_PATTERN.test(first)) {
        errors.firstName = 'Enter a valid first name';
      }
      if (!last) {
        errors.lastName = 'Last name is required';
      } else if (last.length < NAME_MIN_LENGTH) {
        errors.lastName = 'Last name must be at least 3 characters';
      } else if (!NAME_PATTERN.test(last)) {
        errors.lastName = 'Enter a valid last name';
      }
      return errors;
    }
    case 'password': {
      const errors: FieldErrors = {};
      if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      if (!form.confirmPassword) {
        errors.confirmPassword = 'Confirm your password';
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    }
    default:
      return {};
  }
}

export function maskEmail(firstName: string, lastName: string): string {
  const local = `${firstName}.${lastName}`.toLowerCase().replace(/\s+/g, '');
  if (local.length < 3) {
    return 'jo••••@example.com';
  }
  return `${local.slice(0, 2)}••••@example.com`;
}
