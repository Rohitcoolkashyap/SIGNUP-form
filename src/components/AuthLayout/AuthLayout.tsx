import type { ReactNode } from 'react';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <aside className="auth-layout__intro">
        <p className="auth-layout__eyebrow">Let&apos;s get started</p>
        <h1 className="auth-layout__title">Create your account</h1>
        <p className="auth-layout__subtitle">
          Follow the steps to create your account
        </p>
        <img
          className="auth-layout__art"
          src={`${process.env.PUBLIC_URL}/assets/Artboard.png`}
          alt=""
          width={420}
          height={320}
          loading="lazy"
        />
      </aside>
      <main className="auth-layout__main">{children}</main>
    </div>
  );
}
