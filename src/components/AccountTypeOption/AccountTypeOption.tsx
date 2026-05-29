import type { AccountType } from '../../registration/types';
import './AccountTypeOption.css';

interface AccountTypeOptionProps {
  type: AccountType;
  label: string;
  selected: boolean;
  onSelect: (type: AccountType) => void;
}

export function AccountTypeOption({
  type,
  label,
  selected,
  onSelect,
}: AccountTypeOptionProps) {
  return (
    <button
      type="button"
      className={`account-option ${selected ? 'account-option--selected' : ''}`}
      onClick={() => onSelect(type)}
      aria-pressed={selected}
    >
      <span className="account-option__icon" aria-hidden="true">
        {type === 'personal' ? <PersonIcon /> : <BriefcaseIcon />}
      </span>
      <span className="account-option__label">{label}</span>
      {selected && (
        <span className="account-option__check" aria-hidden="true">
          <CheckIcon />
        </span>
      )}
    </button>
  );
}

function PersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7.2 5.8 10 11 4.5"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
