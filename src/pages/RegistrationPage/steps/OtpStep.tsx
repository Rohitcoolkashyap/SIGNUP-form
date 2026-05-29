import { useEffect, useState } from 'react';
import { OtpInput } from '../../../components/OtpInput/OtpInput';
import { StepActions } from '../../../components/StepActions/StepActions';
import { StepCard } from '../../../components/StepCard/StepCard';
import { STEP_PROGRESS } from '../../../registration/types';
import './OtpStep.css';

interface OtpStepProps {
  digits: string[];
  error?: string;
  loading: boolean;
  continueDisabled: boolean;
  onChange: (digits: string[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const RESEND_SECONDS = 30;

export default function OtpStep({
  digits,
  error,
  loading,
  continueDisabled,
  onChange,
  onBack,
  onContinue,
}: OtpStepProps) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = async () => {
    if (secondsLeft > 0 || resending) {
      return;
    }
    setResending(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setResending(false);
    setSecondsLeft(RESEND_SECONDS);
    onChange(['', '', '', '']);
  };

  const hasInput = digits.some((d) => d.length > 0);

  return (
    <StepCard
      progress={STEP_PROGRESS.otp}
      title="OTP Verification"
      subtitle="An OTP has been sent to your mobile number"
      footer={
        <StepActions
          onBack={onBack}
          onContinue={onContinue}
          loading={loading}
          continueDisabled={continueDisabled}
        />
      }
    >
      <OtpInput
        value={digits}
        onChange={onChange}
        error={hasInput ? error : undefined}
        disabled={loading}
      />
      <p className="otp-resend">
        Did not receive OTP?{' '}
        <button
          type="button"
          className="otp-resend__link"
          onClick={handleResend}
          disabled={secondsLeft > 0 || resending}
        >
          {resending ? 'Sending...' : secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend OTP'}
        </button>
      </p>
    </StepCard>
  );
}
