// app/instructor/profile.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function InstructorProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado con gradiente */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>I</Text>
          </View>
          <Text style={styles.userName}>ALEJANDRO MARTÍNEZ</Text>
          <Text style={styles.membership}>Instructor • Sucursal Centro</Text>
        </View>
      </LinearGradient>

      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <StatItem icon="calendar" value="128" label="Días activos" />
        <StatItem icon="lightning-bolt" value="94%" label="Asistencia" />
        <StatItem icon="trophy" value="5" label="Logros" />
      </View>

      {/* Información personal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>
        <InfoRow icon="account" label="Nombre" value="Alejandro Martínez" />
        <InfoRow icon="email" label="Correo" value="instructor@gofitmx.com" />
        <InfoRow icon="phone" label="Teléfono" value="+52 81 1234 5678" />
        <InfoRow icon="map-marker" label="Sucursal" value="Centro (Principal)" />
      </View>

      {/* Acciones del instructor */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCIONES</Text>
        <ActionButton icon="qrcode" label="Mostrar mi QR de acceso" />
        <ActionButton icon="account-group" label="Historial de clientes asignados" />
        <ActionButton icon="bell" label="Recordatorios" />
        <ActionButton icon="settings" label="Configuración de cuenta" />
        <ActionButton icon="logout" label="Cerrar sesión" color="#ef4444" />
      </View>
    </ScrollView>
  );
}

// Componentes auxiliares
const StatItem = ({ icon, value, label }: { icon: string, value: string, label: string }) => (
  <View style={styles.statItem}>
    <MaterialCommunityIcons name={icon} size={24} color={Colors.primary} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const InfoRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <MaterialCommunityIcons name={icon} size={20} color={Colors.textMuted} />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const ActionButton = ({ icon, label, color }: { icon: string, label: string, color?: string }) => (
  <TouchableOpacity style={styles.actionButton}>
    <MaterialCommunityIcons 
      name={icon} 
      size={22} 
      color={color || Colors.text} 
    />
    <Text style={[styles.actionLabel, color && { color }]}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
  </TouchableOpacity>
);

// Estilos
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  membership: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 90,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  section: {
    backgroundColor: Colors.card,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 15,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    marginLeft: 12,
    color: Colors.textMuted,
    fontSize: 15,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  actionLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: Colors.text,
  },
});
