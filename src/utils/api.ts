export interface Pokemon {
  name: string;
  id: number;
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
  }[];
  species: {
    url: string;
  };
}

export interface AllPokemon {
  count: number;
  next: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Species {
  flavor_text_entries: {
    flavor_text: string;
  }[];
}

export async function fetchFn(endpoint: string) {
  const response = await fetch(endpoint);
  return response.json();
}

export async function fetchAllPokemon({ pageParam }: { pageParam?: string }) {
  const response = await fetch(
    pageParam || 'https://pokeapi.co/api/v2/pokemon/'
  );
  return response.json();
}

export async function fetchPokemon(name: string) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  if (!response.ok) {
    throw new Error(`Pokemon ${name} not found`);
  }
  return response.json();
}
