import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchFn, Pokemon } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../navigators/types';

interface PokemonCardProps {
  url: string;
  name: string;
}

export function PokemonCard({ url, name }: PokemonCardProps) {
  const { isLoading, error, data } = useQuery<Pokemon>(['pokemon', name], () =>
    fetchFn(url)
  );
  const navigation =
    useNavigation<MainStackScreenProps<'Home'>['navigation']>();

  if (!data || error) return null;
  if (isLoading) return <ActivityIndicator />;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', { name })}
    >
      <Image
        source={{
          uri: data.sprites.other['official-artwork'].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{data.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 32,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});
