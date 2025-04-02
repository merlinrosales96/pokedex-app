export interface UsePokemonListReturn {
    data: Pokemon[];
    pokemonDetails: { [key: string]: PokemonDetail };
    loading: boolean;
    error: string | null;
    responseCount: number;
}

export interface UsePokemonDataReturn {
    data?: PokemonDetail;
    loading: boolean;
}

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetail {
    id: number,
    name: string,
    weight: number,
    height: number,
    sprites: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    };
    types: PokemonType[],
    moves: PokemonMove[],
    stats: PokemonStats[]
}

export interface PokemonType {
    type: {
        name: string;
    }
}

export interface PokemonMove {
    move: {
        name: string;
    }
}

export interface PokemonStats {
    base_stat: number,
    effort: number,
    stat: {
        name: string
    }
}