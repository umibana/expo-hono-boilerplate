import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export const AuthScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  const navigateToRegister = () => setCurrentScreen('register');
  const navigateToLogin = () => setCurrentScreen('login');

  if (currentScreen === 'register') {
    return <RegisterPage onNavigateToLogin={navigateToLogin} />;
  }

  return <LoginPage onNavigateToRegister={navigateToRegister} />;
};