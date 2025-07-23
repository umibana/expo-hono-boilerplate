import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { authClient } from '@/lib/auth-client';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await authClient.signUp.email({
        email: email.trim(),
        password: password,
        name: name.trim(),
      });
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Registration Failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center px-6 bg-gray-50"
    >
      <View className="bg-white p-6 rounded-lg shadow-sm">
        <Text className="text-2xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              autoCapitalize="words"
            />
          </View>

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
              placeholder="Enter your password (min 6 characters)"
              secureTextEntry
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          className={`mt-6 py-3 rounded-lg ${
            loading ? 'bg-gray-400' : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNavigateToLogin}
          className="mt-4 py-2"
        >
          <Text className="text-blue-500 text-center">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};