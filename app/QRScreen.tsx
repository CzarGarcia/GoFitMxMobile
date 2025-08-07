import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function QRScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="qrcode-scan" 
          size={60} 
          color={Colors.primary}
        />
        <Text style={styles.title}>TU ACCESO DIARIO</Text>
      </View>

      {/* Información del QR */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Código de acceso</Text>
        <Text style={styles.qrCode}>GFXM-USER-12345</Text>
        
        <View style={styles.divider} />
        
        <InfoRow icon="calendar" title="Fecha" value="15 Junio 2023" />
        <InfoRow icon="clock" title="Hora de registro" value="08:45 AM" />
        <InfoRow icon="account" title="Instructor asignado" value="Carlos Mendoza" />
        <InfoRow icon="shield" title="Estado" value="Activo" badgeColor="#10B981" />
      </View>

      {/* Instrucciones */}
      <View style={styles.instructions}>
        <Text style={styles.sectionTitle}>INSTRUCCIONES</Text>
        <Text style={styles.instructionText}>
          • Presenta este código al ingresar al gimnasio
        </Text>
        <Text style={styles.instructionText}>
          • Válido solo por hoy
        </Text>
        <Text style={styles.instructionText}>
          • El instructor verificará tu acceso
        </Text>
      </View>
    </ScrollView>
  );
}

const InfoRow = ({ icon, title, value, badgeColor }: { icon: string, title: string, value: string, badgeColor?: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <MaterialCommunityIcons 
        name={icon} 
        size={22} 
        color={Colors.textMuted}
        style={styles.infoIcon}
      />
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
    {badgeColor ? (
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{value}</Text>
      </View>
    ) : (
      <Text style={styles.infoValue}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 15,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 5,
  },
  qrCode: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 15,
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 15,
    color: Colors.textMuted,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  instructions: {
    backgroundColor: 'rgba(241, 245, 249, 0.6)',
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 15,
    letterSpacing: 1,
  },
  instructionText: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 10,
    marginLeft: 5,
  },
});