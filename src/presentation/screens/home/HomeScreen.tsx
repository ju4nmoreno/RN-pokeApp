import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { getPokemons } from "../../../actions/pokemons"
import { useQuery } from "@tanstack/react-query"
import { Pokeballbg } from "../../components/UI/Pokeballbg"
import { FlatList } from "react-native-gesture-handler"
import { globalStyle } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PokemonCard } from "../../components/pokemons/PokemonCard"

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const { isLoading, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60 // 60 min 
  })
  return (
    <View style={globalStyle.globalMagin}>
      <Pokeballbg style={styles.imagePosition} />

      <FlatList
        data={pokemons}
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
