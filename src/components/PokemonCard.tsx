import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

interface PokemonCardProps {
  url: string;
}

interface Pokemon {
  name: string;
  order: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  };
}

export function PokemonCard({ url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [url]);
  if (!pokemon) return null;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: pokemon.sprites.other['official-artwork'].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
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
