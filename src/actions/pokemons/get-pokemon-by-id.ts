import { pokeApi } from "../../config/api/pokeApi"
import type { Pokemon } from "../../domain/entities/pokemon"
import type { PokeAPIPokemon } from "../../infrastructure/interfaces/pokeApi.interface"
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper"

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`)
    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data)

    return pokemon
  } catch (error) {
    throw new Error(`Error to get this pokemonid ${id}`)
  }


}
