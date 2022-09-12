import { useState, useEffect } from 'react';
import { Stack, Input, Spinner, Icon, Text, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemon, Pokemon } from '../utils/api';
import { MainStackScreenProps } from '../navigators/types';

export function Search({ navigation }: MainStackScreenProps<'Search'>) {
  const [text, setText] = useState('');
  const { data, fetchStatus, error } = useQuery<Pokemon>(
    ['pokemon', text],
    () => fetchPokemon(text.toLowerCase()),
    {
      enabled: !!text,
    }
  );

  useEffect(() => {
    if (data) {
      navigation.replace('Detail', {
        name: data.name,
      });
    }
  }, [data]);

  return (
    <Stack flex={1} p="4">
      <Input
        placeholder="Search Pokémon by name or number"
        backgroundColor="white"
        rounded="xl"
        py="3"
        px="1"
        fontSize="14"
        returnKeyType="search"
        onSubmitEditing={({ nativeEvent }) => setText(nativeEvent.text)}
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
      />
      <Center flex="1">
        {!!error && (
          <Text fontSize="xl" color="gray.500">
            Not results found for {text}
          </Text>
        )}
        {fetchStatus === 'fetching' && <Spinner size="lg" />}
      </Center>
    </Stack>
  );
}
