import { View } from "react-native"
import { ActivityIndicator, useTheme } from "react-native-paper"

export const FullScreenLoader = () => {
  const { colors } = useTheme()

  return (
    <View style={{
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: 'center',
    }}>
      <ActivityIndicator size={50} />
    </View>
  )
}
