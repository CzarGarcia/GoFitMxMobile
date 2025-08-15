// app/instructor/reminders.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function InstructorRemindersScreen() {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Revisar progreso de Juan', date: '15/08/2025' },
    { id: 2, text: 'Enviar QR a María', date: '15/08/2025' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newReminder, setNewReminder] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const addReminder = () => {
    if (newReminder.trim().length === 0) return;
    setReminders(prev => [
      ...prev,
      { id: Date.now(), text: newReminder, date: new Date().toLocaleDateString() }
    ]);
    setNewReminder('');
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordatorios</Text>

      <FlatList
        data={reminders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <Text style={styles.reminderText}>{item.text}</Text>
            <Text style={styles.reminderDate}>{item.date}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Botón para agregar */}
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal para agregar recordatorio */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nuevo Recordatorio</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe el recordatorio..."
              value={newReminder}
              onChangeText={setNewReminder}
            />
            <TouchableOpacity style={styles.saveButton} onPress={addReminder}>
              <Text style={styles.saveButtonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors.secondary, marginTop: 10 }]} onPress={closeModal}>
              <Text style={styles.saveButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: Colors.text },
  reminderCard: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  reminderText: { fontSize: 16, fontWeight: '500', color: Colors.text },
  reminderDate: { fontSize: 12, color: Colors.textMuted, marginTop: 6 },

  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20
  },
  modalTitle: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
});
