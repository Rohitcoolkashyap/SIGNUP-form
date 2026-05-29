import { useState } from 'react';
import { TextInput } from '../../../components/TextInput/TextInput';
import { PasswordToggle } from '../../../components/PasswordToggle/PasswordToggle';
import { StepActions } from '../../../components/StepActions/StepActions';
import { StepCard } from '../../../components/StepCard/StepCard';
import { STEP_PROGRESS } from '../../../registration/types';

interface PasswordStepProps {
  password: string;
  confirmPassword: string;
  errors: { password?: string; confirmPassword?: string };
  touched: { password?: boolean; confirmPassword?: boolean };
  loading: boolean;
  continueDisabled: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
  onPasswordBlur: () => void;
  onConfirmBlur: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function PasswordStep({
  password,
  confirmPassword,
  errors,
  touched,
  loading,
  continueDisabled,
  onPasswordChange,
  onConfirmChange,
  onPasswordBlur,
  onConfirmBlur,
  onBack,
  onContinue,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showPasswordError =
    errors.password && (touched.password || password.length > 0);
  const showConfirmError =
    errors.confirmPassword &&
    (touched.confirmPassword || confirmPassword.length > 0);

  return (
    <StepCard
      progress={STEP_PROGRESS.password}
      title="Create Password for your account"
      footer={
        <StepActions
          onBack={onBack}
          onContinue={onContinue}
          loading={loading}
          continueDisabled={continueDisabled}
          continueLabel="Continue"
        />
      }
    >
      <TextInput
        label="Enter new password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter new password"
        value={password}
        required
        hint="Must be atleast 6 characters"
        error={showPasswordError ? errors.password : undefined}
        onChange={(e) => onPasswordChange(e.target.value)}
        onBlur={onPasswordBlur}
        suffix={
          <PasswordToggle
            visible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            label={showPassword ? 'Hide password' : 'Show password'}
          />
        }
      />
      <TextInput
        label="Confirm password"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Confirm password"
        value={confirmPassword}
        required
        hint="Both passwords must match"
        error={showConfirmError ? errors.confirmPassword : undefined}
        onChange={(e) => onConfirmChange(e.target.value)}
        onBlur={onConfirmBlur}
        suffix={
          <PasswordToggle
            visible={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
            label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
          />
        }
      />
    </StepCard>
  );
}
