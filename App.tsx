import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainNavigator } from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
