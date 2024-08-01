import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { getPokemons } from "../../../actions/pokemons"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pokeballbg } from "../../components/UI/Pokeballbg"
import { FlatList } from "react-native-gesture-handler"
import { globalStyle } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PokemonCard } from "../../components/pokemons/PokemonCard"

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const queryClient = useQueryClient()

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 1 h 

    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam)
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
      })
      return pokemons
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  })
  return (
    <View style={globalStyle.globalMagin}>
      <Pokeballbg style={styles.imagePosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id.toString()}-${index}`}
        numColumns={2}
        style={{
          paddingTop: top + 20
        }}
        ListHeaderComponent={() => (
          <Text variant="displayMedium">Pokedex</Text>
        )}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
})
