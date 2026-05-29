import { StepActions } from '../../../components/StepActions/StepActions';
import { StepCard } from '../../../components/StepCard/StepCard';
import { STEP_PROGRESS } from '../../../registration/types';
import './MobileStep.css';

interface MobileStepProps {
  mobile: string;
  error?: string;
  loading: boolean;
  continueDisabled: boolean;
  onMobileChange: (value: string) => void;
  onBlur: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function MobileStep({
  mobile,
  error,
  loading,
  continueDisabled,
  onMobileChange,
  onBlur,
  onBack,
  onContinue,
}: MobileStepProps) {
  return (
    <StepCard
      progress={STEP_PROGRESS.mobile}
      title="OTP Verification"
      footer={
        <StepActions
          onBack={onBack}
          onContinue={onContinue}
          loading={loading}
          continueDisabled={continueDisabled}
        />
      }
    >
      <div className={`phone-field ${error ? 'phone-field--error' : ''}`}>
        <label className="phone-field__label" htmlFor="mobile-number">
          Mobile Number<span className="phone-field__required">*</span>
        </label>
        <div className="phone-field__row">
          <span className="phone-field__country" aria-label="Country code">
            +91
          </span>
          <input
            id="mobile-number"
            className="phone-field__input"
            type="tel"
            inputMode="numeric"
            placeholder="8343989239"
            value={mobile}
            maxLength={10}
            aria-invalid={Boolean(error)}
            onChange={(e) => onMobileChange(e.target.value.replace(/\D/g, ''))}
            onBlur={onBlur}
          />
        </div>
        {error && (
          <p className="phone-field__error" role="alert">
            {error}
          </p>
        )}
      </div>
    </StepCard>
  );
}
