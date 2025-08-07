// app/home.tsx
import { StyleSheet, View } from 'react-native';
import FullScreenMenu from '../components/Menu';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Tu contenido principal aquí */}
      <FullScreenMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Espacio para el botón del menú
  },
});