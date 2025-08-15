import { Stack, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import InstructorMenu from '../components/InstructorMenu';
import FullScreenMenu from '../components/Menu';

export default function RootLayout() {
  const pathname = usePathname();

  // Detecta si es pantalla de instructor
  const isInstructor = pathname === '/InstructorHomeScreen';

  const shouldShowMenu = pathname !== '/' && pathname !== '/index';
  
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Inicio' }} />
        <Stack.Screen name="ProfileScreen" options={{ title: 'Mi Perfil' }} />
        <Stack.Screen name="QRScreen" options={{ title: 'Código QR' }} />
        <Stack.Screen name="ScheduleScreen" options={{ title: 'Mi Agenda' }} />
        <Stack.Screen name="PaymentMembershipScreen" options={{ title: 'Pagos y Membresía' }} />
        <Stack.Screen name="InstructorHomeScreen" options={{ title: 'Inicio Instructor' }} />
        <Stack.Screen name="InstructorAttendanceScreen" options={{ title: 'Asistencias' }} />
        <Stack.Screen name="InstructorQRScreen" options={{ title: 'Código QR Instructor' }} />
        <Stack.Screen name="InstructorClientsScreen" options={{ title: 'Clientes Asignados' }} />
        <Stack.Screen name="InstructorRemindersScreen" options={{ title: 'Recordatorios' }} />
        <Stack.Screen name="instructor/profile" options={{ title: 'Perfil Instructor' }} />
        <Stack.Screen name="instructor/attendance" options={{ title: 'Asistencias Instructor' }} />
        <Stack.Screen name="instructor/qr" options={{ title: 'Código QR Instructor' }} />
        <Stack.Screen name="instructor/clients" options={{ title: 'Clientes Asignados' }} />
        <Stack.Screen name="instructor/reminders" options={{ title: 'Recordatorios Instructor' }} />
      </Stack>

      {shouldShowMenu && (isInstructor ? <InstructorMenu /> : <FullScreenMenu />)}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
