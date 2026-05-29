import type { ReactNode } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import './StepCard.css';

interface StepCardProps {
  progress: number;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  footer: ReactNode;
}

export function StepCard({
  progress,
  title,
  subtitle,
  children,
  footer,
}: StepCardProps) {
  return (
    <section className="step-card" aria-live="polite">
      <ProgressBar value={progress} />
      <div className="step-card__body">
        <header className="step-card__header">
          <h2 className="step-card__title">{title}</h2>
          {subtitle && <p className="step-card__subtitle">{subtitle}</p>}
        </header>
        <div className="step-card__content">{children}</div>
        {footer}
      </div>
    </section>
  );
}
