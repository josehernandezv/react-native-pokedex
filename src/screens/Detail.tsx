import { View, Text } from 'react-native';
import { MainStackScreenProps } from '../navigators/types';

export function Detail({ route }: MainStackScreenProps<'Detail'>) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40 }}>{name}</Text>
    </View>
  );
}
