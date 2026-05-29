import { TextInput } from '../../../components/TextInput/TextInput';
import { StepActions } from '../../../components/StepActions/StepActions';
import { StepCard } from '../../../components/StepCard/StepCard';
import { STEP_PROGRESS } from '../../../registration/types';

interface NameStepProps {
  firstName: string;
  lastName: string;
  errors: { firstName?: string; lastName?: string };
  touched: { firstName?: boolean; lastName?: boolean };
  loading: boolean;
  continueDisabled: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onFirstNameBlur: () => void;
  onLastNameBlur: () => void;
  onBack: () => void;
  onContinue: () => void;
}

function fieldError(
  value: string,
  touched: boolean | undefined,
  message?: string
): string | undefined {
  if (!message) {
    return undefined;
  }
  if (touched || value.trim().length > 0) {
    return message;
  }
  return undefined;
}

export default function NameStep({
  firstName,
  lastName,
  errors,
  touched,
  loading,
  continueDisabled,
  onFirstNameChange,
  onLastNameChange,
  onFirstNameBlur,
  onLastNameBlur,
  onBack,
  onContinue,
}: NameStepProps) {
  return (
    <StepCard
      progress={STEP_PROGRESS.name}
      title="What is your name?"
      footer={
        <StepActions
          onBack={onBack}
          onContinue={onContinue}
          loading={loading}
          continueDisabled={continueDisabled}
        />
      }
    >
      <TextInput
        label="First Name"
        placeholder="Oliver"
        value={firstName}
        required
        error={fieldError(firstName, touched.firstName, errors.firstName)}
        onChange={(e) => onFirstNameChange(e.target.value)}
        onBlur={onFirstNameBlur}
      />
      <TextInput
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        required
        error={fieldError(lastName, touched.lastName, errors.lastName)}
        onChange={(e) => onLastNameChange(e.target.value)}
        onBlur={onLastNameBlur}
      />
    </StepCard>
  );
}
