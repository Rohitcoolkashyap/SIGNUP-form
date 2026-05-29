import { useCallback, useMemo, useState } from 'react';
import type {
  FieldErrors,
  RegistrationForm,
  RegistrationStep,
} from './types';
import { STEP_ORDER } from './types';
import { isStepValid, validateStep } from './validation';

const initialForm: RegistrationForm = {
  accountType: 'personal',
  mobile: '',
  otp: ['', '', '', ''],
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

type TouchedFields = Partial<Record<keyof RegistrationForm | 'otp', boolean>>;

const STEP_TOUCHED_KEYS: Record<RegistrationStep, Array<keyof TouchedFields>> = {
  'account-type': ['accountType'],
  mobile: ['mobile'],
  otp: ['otp'],
  name: ['firstName', 'lastName'],
  password: ['password', 'confirmPassword'],
};

const downstreamFields = {
  otp: ['', '', '', ''] as string[],
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

export function useRegistration() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const step = STEP_ORDER[stepIndex];

  const isCurrentStepValid = useMemo(
    () => isStepValid(step, form),
    [step, form]
  );

  const updateField = useCallback(
    <K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) {
          return prev;
        }
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const markTouched = useCallback((key: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const markStepTouched = useCallback((currentStep: RegistrationStep) => {
    setTouched((prev) => {
      const next = { ...prev };
      STEP_TOUCHED_KEYS[currentStep].forEach((key) => {
        next[key] = true;
      });
      return next;
    });
  }, []);

  const clearDownstreamState = useCallback(() => {
    setForm((prev) => ({ ...prev, ...downstreamFields }));
    setTouched((prev) => {
      const next = { ...prev };
      delete next.otp;
      delete next.firstName;
      delete next.lastName;
      delete next.password;
      delete next.confirmPassword;
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.otp;
      delete next.firstName;
      delete next.lastName;
      delete next.password;
      delete next.confirmPassword;
      return next;
    });
    setShowSuccess(false);
  }, []);

  const runValidation = useCallback(
    (currentStep: RegistrationStep = step) => {
      const nextErrors = validateStep(currentStep, form);
      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    },
    [form, step]
  );

  const goNext = useCallback(async () => {
    if (!runValidation()) {
      markStepTouched(step);
      return false;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (step === 'mobile') {
      clearDownstreamState();
    }

    if (stepIndex === STEP_ORDER.length - 1) {
      setShowSuccess(true);
      setIsSubmitting(false);
      return true;
    }

    setStepIndex((i) => i + 1);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    return true;
  }, [runValidation, markStepTouched, step, stepIndex, clearDownstreamState]);

  const goBack = useCallback(() => {
    if (stepIndex === 0) {
      return;
    }
    setStepIndex((i) => i - 1);
    setErrors({});
  }, [stepIndex]);

  const displayName = useMemo(() => {
    const first = form.firstName.trim();
    const last = form.lastName.trim();
    return `${first} ${last}`.trim();
  }, [form.firstName, form.lastName]);

  return {
    step,
    stepIndex,
    form,
    errors,
    touched,
    isSubmitting,
    showSuccess,
    isCurrentStepValid,
    updateField,
    markTouched,
    runValidation,
    goNext,
    goBack,
    displayName,
    setShowSuccess,
  };
}
