import { ScreenContent } from 'components/ScreenContent';
import { PingPong } from 'components/PingPong';
import { AuthScreen } from 'components/AuthScreen';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { authClient } from 'lib/auth-client';
import './global.css';
import { TRPCProvider } from './lib/api';

function AppContent() {
  const { data: session} = authClient.useSession();


  if (!session) {
    return <AuthScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-white p-2 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="text-red-text-lg font-semibold">Welcome, {session.user?.name}!</Text>
          <TouchableOpacity 
            onPress={() => authClient.signOut()}
            className="bg-red-500 px-4 py-2 rounded"
          >
            <Text className="text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <PingPong />
    <StatusBar backgroundColor='red' style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <TRPCProvider>
      <AppContent />
    </TRPCProvider>
  );
}
