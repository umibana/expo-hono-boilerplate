import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from '../lib/api';

export const PingPong = () => {


  const { data, isLoading, error,refetch } = api.secret.useQuery(undefined, {
    enabled: false,
  });

  const { data:publicMessage,refetch:publicRefetch } = api.greeting.useQuery(undefined, {
    enabled: false,
  });

  return (
    <View className="items-center p-4 bg-blue-50 rounded-lg m-4">
      <Text className="text-lg font-bold mb-4">tRPC Ping Test</Text>
      
      <TouchableOpacity
        onPress={() => {
          refetch();
          publicRefetch();
        }}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg ${
          isLoading ? 'bg-gray-400' : 'bg-blue-500'
        }`}
      >
        <Text className="text-white font-semibold">
          {isLoading ? 'Pinging...' : 'Ping Server'}
        </Text>
      </TouchableOpacity>

      {data && (
        <View className="mt-4 p-2 bg-white rounded border">
          <Text className="text-gray-700">Secret (Auth): {data}</Text>
          <Text className="text-gray-700">Public (No Auth): {publicMessage}</Text>
        </View>
      )}
    </View>
  );
};