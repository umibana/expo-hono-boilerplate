import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { authClient } from '@/lib/auth-client';

interface LoginPageProps {
  onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async () => {
    const {data, error} = await authClient.signIn.email({
      email,
      password,
    })
    if (error?.message) {
      console.log(error.message);
      setStatus(error.message || 'An error occurred');
    } else {
      setStatus('Login successful');
      console.log(data);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center px-6 bg-gray-50"
    >
      <View className="bg-white p-6 rounded-lg shadow-sm">
        <Text className="text-2xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className={`mt-6 py-3 rounded-lg ${
             'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-semibold">
            Login
          </Text>
        </TouchableOpacity>
          <Text className="text-black text-center font-semibold p-2">{status}</Text>
        <TouchableOpacity
          onPress={onNavigateToRegister}
          className="mt-4 py-2"
        >
          <Text className="text-blue-500 text-center">
            Don&apos;t have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};