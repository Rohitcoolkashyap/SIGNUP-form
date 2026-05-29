import { Suspense, lazy } from 'react';

const RegistrationPage = lazy(
  () => import('./pages/RegistrationPage/RegistrationPage')
);

function App() {
  return (
    <Suspense fallback={<div className="app-loader" aria-live="polite" />}>
      <RegistrationPage />
    </Suspense>
  );
}

export default App;
