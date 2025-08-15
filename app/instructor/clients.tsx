// app/instructor/clients.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function InstructorClientsScreen() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Juan Pérez', day: 'Lunes', progress: 75, sessionDuration: '1h 15min', notes: 'Enfocarse en fuerza', retired: false, comment: '' },
    { id: 2, name: 'María García', day: 'Lunes', progress: 68, sessionDuration: '45min', notes: 'Cardio y resistencia', retired: true, comment: '' },
    { id: 3, name: 'Carlos López', day: 'Lunes', progress: 92, sessionDuration: '1h', notes: 'Trabajo personalizado', retired: false, comment: '' },
  ]);

  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const today = 'Lunes'; // reemplaza por lógica real de fecha

  const openModal = (client: any) => {
    setSelectedClient(client);
    setComment(client.comment || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedClient(null);
  };

  const saveComment = () => {
    if (selectedClient) {
      setClients(prev =>
        prev.map(c => c.id === selectedClient.id ? { ...c, comment } : c)
      );
    }
    closeModal();
  };

  const assignedToday = clients.filter(c => c.day === today && !c.retired);
  const retiredClients = clients.filter(c => c.day === today && c.retired);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clientes asignados hoy</Text>
      {assignedToday.map(client => (
        <View key={client.id} style={styles.clientCard}>
          <Text style={styles.clientName}>{client.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${client.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{client.progress}%</Text>
        </View>
      ))}

      <Text style={[styles.title, { marginTop: 30 }]}>Clientes retirados</Text>
      {retiredClients.map(client => (
        <TouchableOpacity key={client.id} style={styles.clientCard} onPress={() => openModal(client)}>
          <Text style={styles.clientName}>{client.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${client.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{client.progress}%</Text>
          {client.comment && <Text style={styles.commentText}>Comentario: {client.comment}</Text>}
        </TouchableOpacity>
      ))}

      {/* Modal para agregar comentario */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedClient && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedClient.name}</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={28} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                  <Text style={styles.modalLabel}>Duración sesión:</Text>
                  <Text style={styles.modalValue}>{selectedClient.sessionDuration}</Text>

                  <Text style={styles.modalLabel}>Notas:</Text>
                  <Text style={styles.modalValue}>{selectedClient.notes}</Text>

                  <Text style={styles.modalLabel}>Comentario</Text>
                  <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Agregar comentario..."
                  />

                  <TouchableOpacity style={styles.saveButton} onPress={saveComment}>
                    <Text style={styles.saveButtonText}>Guardar comentario</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 15, color: Colors.text },
  clientCard: {
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
  clientName: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { fontSize: 12, color: Colors.textMuted, marginTop: 4, textAlign: 'right' },
  commentText: { fontSize: 13, color: Colors.secondary, marginTop: 4 },

  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContainer: { width: '100%', backgroundColor: Colors.card, borderRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: Colors.text },
  modalContent: { marginTop: 10 },
  modalLabel: { fontSize: 14, color: Colors.textMuted, fontWeight: '600', marginTop: 10 },
  modalValue: { fontSize: 16, color: Colors.text, marginTop: 2 },
  input: { borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderRadius: 10, padding: 10, marginTop: 8 },
  saveButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 10, marginTop: 15, alignItems: 'center' },
  saveButtonText: { color: 'white', fontWeight: '600' },
});
