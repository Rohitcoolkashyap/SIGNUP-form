import { AccountTypeOption } from '../../../components/AccountTypeOption/AccountTypeOption';
import { StepActions } from '../../../components/StepActions/StepActions';
import { StepCard } from '../../../components/StepCard/StepCard';
import type { AccountType } from '../../../registration/types';
import { STEP_PROGRESS } from '../../../registration/types';

interface AccountTypeStepProps {
  value: AccountType;
  error?: string;
  loading: boolean;
  onSelect: (type: AccountType) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function AccountTypeStep({
  value,
  error,
  loading,
  onSelect,
  onBack,
  onContinue,
}: AccountTypeStepProps) {
  return (
    <StepCard
      progress={STEP_PROGRESS['account-type']}
      title={
        <>
          To join us tell us <strong>what type of account</strong> you are opening
        </>
      }
      footer={
        <StepActions
          onBack={onBack}
          onContinue={onContinue}
          loading={loading}
          showBack={false}
        />
      }
    >
      <div className="account-type-list" role="radiogroup" aria-label="Account type">
        <AccountTypeOption
          type="personal"
          label="Personal"
          selected={value === 'personal'}
          onSelect={onSelect}
        />
        <AccountTypeOption
          type="business"
          label="Business"
          selected={value === 'business'}
          onSelect={onSelect}
        />
      </div>
      {error && (
        <p className="step-inline-error" role="alert">
          {error}
        </p>
      )}
    </StepCard>
  );
}
