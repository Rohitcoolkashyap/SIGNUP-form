import { Suspense, lazy, useCallback, useMemo } from 'react';
import { validateStep } from '../../registration/validation';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import {
  SuccessModal,
  buildSuccessEmail,
} from '../../components/SuccessModal/SuccessModal';
import { useRegistration } from '../../registration/useRegistration';
import type { AccountType } from '../../registration/types';
import './RegistrationPage.css';

const AccountTypeStep = lazy(() => import('./steps/AccountTypeStep'));
const MobileStep = lazy(() => import('./steps/MobileStep'));
const OtpStep = lazy(() => import('./steps/OtpStep'));
const NameStep = lazy(() => import('./steps/NameStep'));
const PasswordStep = lazy(() => import('./steps/PasswordStep'));

function StepFallback() {
  return <div className="step-card step-card--loading" aria-hidden="true" />;
}

export default function RegistrationPage() {
  const {
    step,
    form,
    touched,
    isSubmitting,
    showSuccess,
    isCurrentStepValid,
    updateField,
    markTouched,
    goNext,
    goBack,
    displayName,
  } = useRegistration();

  const stepErrors = useMemo(() => validateStep(step, form), [step, form]);

  const handleContinue = useCallback(() => {
    void goNext();
  }, [goNext]);

  const handleDashboard = useCallback(() => {
    window.location.href = '/';
  }, []);

  const stepContent = (() => {
    switch (step) {
      case 'account-type':
        return (
          <AccountTypeStep
            value={form.accountType}
            error={stepErrors.accountType as string | undefined}
            loading={isSubmitting}
            onSelect={(type: AccountType) => updateField('accountType', type)}
            onBack={goBack}
            onContinue={handleContinue}
          />
        );
      case 'mobile':
        return (
          <MobileStep
            mobile={form.mobile}
            error={
              touched.mobile || form.mobile.length > 0
                ? stepErrors.mobile
                : undefined
            }
            loading={isSubmitting}
            continueDisabled={!isCurrentStepValid}
            onMobileChange={(value) => updateField('mobile', value)}
            onBlur={() => markTouched('mobile')}
            onBack={goBack}
            onContinue={handleContinue}
          />
        );
      case 'otp':
        return (
          <OtpStep
            digits={form.otp}
            error={touched.otp || form.otp.some(Boolean) ? stepErrors.otp : undefined}
            loading={isSubmitting}
            continueDisabled={!isCurrentStepValid}
            onChange={(digits) => updateField('otp', digits)}
            onBack={goBack}
            onContinue={handleContinue}
          />
        );
      case 'name':
        return (
          <NameStep
            firstName={form.firstName}
            lastName={form.lastName}
            errors={{
              firstName: stepErrors.firstName,
              lastName: stepErrors.lastName,
            }}
            touched={{
              firstName: touched.firstName,
              lastName: touched.lastName,
            }}
            loading={isSubmitting}
            continueDisabled={!isCurrentStepValid}
            onFirstNameChange={(value) => updateField('firstName', value)}
            onLastNameChange={(value) => updateField('lastName', value)}
            onFirstNameBlur={() => markTouched('firstName')}
            onLastNameBlur={() => markTouched('lastName')}
            onBack={goBack}
            onContinue={handleContinue}
          />
        );
      case 'password':
        return (
          <PasswordStep
            password={form.password}
            confirmPassword={form.confirmPassword}
            errors={{
              password: stepErrors.password,
              confirmPassword: stepErrors.confirmPassword,
            }}
            touched={{
              password: touched.password,
              confirmPassword: touched.confirmPassword,
            }}
            loading={isSubmitting}
            continueDisabled={!isCurrentStepValid}
            onPasswordChange={(value) => updateField('password', value)}
            onConfirmChange={(value) => updateField('confirmPassword', value)}
            onPasswordBlur={() => markTouched('password')}
            onConfirmBlur={() => markTouched('confirmPassword')}
            onBack={goBack}
            onContinue={handleContinue}
          />
        );
      default:
        return null;
    }
  })();

  const maskedMobile = form.mobile || '9711677290';
  const email = buildSuccessEmail(
    form.firstName || 'John',
    form.lastName || 'Doe'
  );

  return (
    <AuthLayout>
      <Suspense fallback={<StepFallback />}>{stepContent}</Suspense>
      {showSuccess && (
        <SuccessModal
          accountType={form.accountType}
          email={email}
          name={displayName}
          mobile={maskedMobile}
          onDashboard={handleDashboard}
        />
      )}
    </AuthLayout>
  );
}
