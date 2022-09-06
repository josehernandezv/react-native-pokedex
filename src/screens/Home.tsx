import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { PokemonCard } from '../components/PokemonCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AllPokemon, fetchAllPokemon } from '../utils/api';

export function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<AllPokemon>(['pokemons'], fetchAllPokemon, {
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <ActivityIndicator />;
  if (!data) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.pages.flatMap((page) => page.results)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard url={item.url} name={item.name} />
        )}
        onEndReached={loadMore}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator /> : null
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
