import { ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchFn, Pokemon } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../navigators/types';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Stack,
  Pressable,
  Center,
  AspectRatio,
} from 'native-base';
import { formatNumber, getTypeColor } from '../utils/helper';

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
    <Pressable
      flex={1}
      m="1.5"
      p="4"
      backgroundColor={getTypeColor(data.types[0].type.name) + '.500'}
      borderRadius={10}
      onPress={() => navigation.navigate('Detail', { name })}
    >
      <Center>
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: data.sprites.other['official-artwork'].front_default,
            }}
            alt="image"
          />
        </AspectRatio>
      </Center>
      <HStack justifyContent="space-between" mb={2}>
        <Heading textTransform="capitalize" color="white" size="sm">
          {data.name}
        </Heading>
        <Text color="white">#{formatNumber(data.id)}</Text>
      </HStack>
      <HStack>
        {data.types.map((type) => (
          <Box
            key={type.type.name}
            px="2"
            mr="1"
            backgroundColor={getTypeColor(type.type.name) + '.400'}
            borderRadius={10}
            _text={{
              color: 'white',
              fontSize: 'xs',
            }}
          >
            {type.type.name}
          </Box>
        ))}
      </HStack>
    </Pressable>
  );
}
