// app/instructor/attendance.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

const attendanceData = [
  { id: '1', day: '2025-08-01', duration: '1h 20m', client: 'Juan Pérez' },
  { id: '2', day: '2025-08-03', duration: '45m', client: 'María García' },
  { id: '3', day: '2025-08-04', duration: '1h 10m', client: 'Carlos López' },
];

export default function InstructorAttendanceScreen() {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: any) => {
    setSelectedDay(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDay(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencias</Text>

      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <Animatable.View animation="fadeInUp" style={styles.dayItem}>
            <TouchableOpacity onPress={() => openModal(item)} style={styles.dayButton}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </Animatable.View>
        )}
      />

      {/* Modal con info del día */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animatable.View animation="fadeInUp" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del día</Text>
            {selectedDay && (
              <>
                <Text style={styles.modalText}>Día: {selectedDay.day}</Text>
                <Text style={styles.modalText}>Duración: {selectedDay.duration}</Text>
                <Text style={styles.modalText}>Cliente asignado: {selectedDay.client}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  dayItem: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: Colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  dayButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.card,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.text,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.textMuted,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
