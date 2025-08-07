import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { Colors } from '../constants/Colors'

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }}>
      <Link href="/home" asChild>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>GOFITMX</Text>
      </Link>
    </View>
  )
}