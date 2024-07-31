import { useContext } from "react"
import { StyleProp, Image, ImageStyle } from "react-native"
import { ThemeContext } from "../../context/ThemeContext"

interface Props {
  style?: StyleProp<ImageStyle>
}

export const Pokeballbg = ({ style }: Props) => {
  const { isDark } = useContext(ThemeContext)

  const pokeballbg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png')

  return (
    <Image
      source={pokeballbg}
      style={[
        {
          width: 300,
          height: 300,
          opacity: .3,
        },
        style
      ]}
    />
  )
}
