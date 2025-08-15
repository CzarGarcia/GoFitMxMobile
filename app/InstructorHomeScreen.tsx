// app/instructor/home.tsx
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function InstructorHomeScreen() {

  const clientsAssignedToday = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Carlos López' },
  ];

  const clientsProgress = [
    { id: 1, name: 'Juan Pérez', progress: 75 },
    { id: 2, name: 'María García', progress: 68 },
    { id: 3, name: 'Carlos López', progress: 92 },
  ];

  const responsiveValue = (mobileValue: number, tabletValue: number) =>
    width >= 768 ? tabletValue : mobileValue;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Panel del Instructor</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Clientes asignados para hoy */}
      <Animatable.View animation="fadeInUp" delay={300} style={styles.card}>
        <Text style={styles.cardTitle}>Clientes asignados para hoy</Text>
        {clientsAssignedToday.map((client) => (
          <View
            key={client.id}
            style={[
              styles.clientCard,
              { padding: responsiveValue(12, 16), marginBottom: responsiveValue(10, 14) }
            ]}
          >
            <Text style={[styles.clientName, { fontSize: responsiveValue(16, 18) }]}>
              {client.name}
            </Text>
          </View>
        ))}
      </Animatable.View>

      {/* Progreso de clientes */}
      <Animatable.View animation="fadeInUp" delay={500} style={styles.card}>
        <Text style={styles.cardTitle}>Progreso de Clientes</Text>
        {clientsProgress.map((client) => (
          <View key={client.id} style={styles.clientItem}>
            <Text style={styles.clientName}>{client.name}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${client.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{client.progress}%</Text>
          </View>
        ))}
      </Animatable.View>

      {/* Quick Actions */}
      <Animatable.View animation="fadeInUp" delay={700} style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar" size={24} color="#3b82f6" />
          <Text style={styles.actionText}>Agendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="stats-chart" size={24} color="#3b82f6" />
          <Text style={styles.actionText}>Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubbles" size={24} color="#3b82f6" />
          <Text style={styles.actionText}>Mensajes</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  clientCard: {
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientName: {
    fontWeight: '500',
    color: '#1e40af',
  },
  clientItem: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'right',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    color: '#3b82f6',
    fontWeight: '500',
  },
});
