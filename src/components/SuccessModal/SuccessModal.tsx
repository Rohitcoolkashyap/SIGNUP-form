import { Button } from '../Button/Button';
import type { AccountType } from '../../registration/types';
import { maskEmail } from '../../registration/validation';
import './SuccessModal.css';

interface SuccessModalProps {
  accountType: AccountType;
  email: string;
  name: string;
  mobile: string;
  onDashboard: () => void;
}

export function SuccessModal({
  accountType,
  email,
  name,
  mobile,
  onDashboard,
}: SuccessModalProps) {
  return (
    <div className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <div className="success-modal__backdrop" />
      <div className="success-modal__panel">
        <div className="success-modal__icon" aria-hidden="true">
          <CheckBadge />
        </div>
        <h2 id="success-title" className="success-modal__title">
          You&apos;re all set!
        </h2>
        <p className="success-modal__lead">
          Here&apos;s a quick summary of your account details
        </p>
        <dl className="success-modal__summary">
          <div className="success-modal__row">
            <dt>Account Type</dt>
            <dd>{accountType === 'personal' ? 'Personal' : 'Business'}</dd>
          </div>
          <div className="success-modal__row">
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div className="success-modal__row">
            <dt>Name</dt>
            <dd>{name}</dd>
          </div>
          <div className="success-modal__row">
            <dt>Mobile Number</dt>
            <dd>{mobile}</dd>
          </div>
        </dl>
        <p className="success-modal__secure">
          <ShieldIcon />
          Your account is secured with bank-grade security
        </p>
        <Button variant="primary" className="success-modal__cta" onClick={onDashboard}>
          Go To Dashboard
        </Button>
      </div>
    </div>
  );
}

export function buildSuccessEmail(
  firstName: string,
  lastName: string
): string {
  return maskEmail(firstName, lastName);
}

function CheckBadge() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M7 14.5 11.5 19 21 9"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 5 6v6c0 4.2 3 7.8 7 9 4-1.2 7-4.8 7-9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 12.5 11 14.5 15 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
