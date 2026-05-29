import { Button } from '../Button/Button';
import './StepActions.css';

interface StepActionsProps {
  onBack: () => void;
  onContinue: () => void;
  loading?: boolean;
  continueLabel?: string;
  showBack?: boolean;
  continueDisabled?: boolean;
}

export function StepActions({
  onBack,
  onContinue,
  loading = false,
  continueLabel = 'Continue',
  showBack = true,
  continueDisabled = false,
}: StepActionsProps) {
  return (
    <div className="step-actions">
      {showBack && (
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>
      )}
      <Button
        variant="primary"
        onClick={onContinue}
        loading={loading}
        disabled={continueDisabled}
      >
        {continueLabel}
      </Button>
    </div>
  );
}
