import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from '../screens/Detail';
import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLargeTitle: true,
          headerTitle: 'Pokédex',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <MaterialIcons name="search" color="black" size={32} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Search" component={Search} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
