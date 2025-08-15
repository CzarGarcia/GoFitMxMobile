import { Stack, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import FullScreenMenu from '../components/Menu';

export default function RootLayout() {
  const pathname = usePathname(); // detecta la ruta actual

  const shouldShowMenu = pathname !== '/' && pathname !== '/index'; // oculta solo en index

  return (
    <View style={styles.container}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Inicio' }} />
        <Stack.Screen name="ProfileScreen" options={{ title: 'Mi Perfil' }} />
        <Stack.Screen name="QRScreen" options={{ title: 'Código QR' }} />
        <Stack.Screen name="ScheduleScreen" options={{ title: 'Mi Agenda' }} />
        <Stack.Screen name="PaymentMembershipScreen" options={{ title: 'Pagos y Membresía' }} />
      </Stack>

      {shouldShowMenu && <FullScreenMenu />} {/* ✅ solo se muestra si no estás en index */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
