import { PokemonCard } from '../components/PokemonCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AllPokemon, fetchAllPokemon } from '../utils/api';
import { Center, Spinner, FlatList } from 'native-base';

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

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color="black" />
      </Center>
    );
  if (!data) return null;

  return (
    <FlatList
      data={data.pages.flatMap((page) => page.results)}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <PokemonCard name={item.name} />}
      onEndReached={loadMore}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={() =>
        isFetchingNextPage ? <Spinner mt="4" size="lg" color="black" /> : null
      }
      _contentContainerStyle={{ p: 2, bg: 'white' }}
    />
  );
}
