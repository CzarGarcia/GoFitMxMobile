import { Text, View } from 'react-native'
import Header from '../components/Header'
import { Colors } from '../constants/Colors'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header />
      <View style={{ padding: 16 }}>
        <Text style={{ color: Colors.text, fontSize: 18 }}>
          Contenido principal aquí...
        </Text>
      </View>
    </View>
  )
}