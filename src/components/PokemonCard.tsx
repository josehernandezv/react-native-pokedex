import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchFn, Pokemon } from '../utils/api';

interface PokemonCardProps {
  url: string;
  name: string;
}

export function PokemonCard({ url, name }: PokemonCardProps) {
  const { isLoading, error, data } = useQuery<Pokemon>(['pokemon', name], () =>
    fetchFn(url)
  );

  if (!data || error) return null;
  if (isLoading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data.sprites.other['official-artwork'].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{data.name}</Text>
    </View>
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
