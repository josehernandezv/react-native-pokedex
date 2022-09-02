import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { PokemonCard } from './src/components/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
}

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [next, setNext] = useState<string>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
        setNext(data.next);
      });
  }, []);

  const loadMore = () => {
    if (isLoadingMore) return;
    if (next) {
      setIsLoadingMore(true);
      fetch(next)
        .then((res) => res.json())
        .then((data) => {
          setPokemon((prevPokemon) => [...prevPokemon, ...data.results]);
          setNext(data.next);
          setIsLoadingMore(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard url={item.url} />}
        onEndReached={loadMore}
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
