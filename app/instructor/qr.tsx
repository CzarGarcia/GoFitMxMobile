// app/instructor/qr.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function InstructorQRScreen() {
  const accessCode = 'INST-12345';

  const copyToClipboard = () => {
    // Copia al portapapeles usando navigator.clipboard (Expo Web) o Alert en móvil
    Alert.alert('Copiado', 'Tu código de acceso se copió al portapapeles');
  };

  // Generar patrón “QR” simple
  const renderQRCode = () => {
    const size = 12; // tamaño de cada cuadro
    const matrix = [
      [1,0,1,1,0,1,0,1],
      [0,1,0,0,1,0,1,0],
      [1,0,1,1,0,1,0,1],
      [1,0,1,0,1,0,1,1],
      [0,1,0,1,0,1,0,0],
      [1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0],
    ];
    return (
      <View style={{ flexDirection: 'column' }}>
        {matrix.map((row, i) => (
          <View key={i} style={{ flexDirection: 'row' }}>
            {row.map((cell, j) => (
              <View
                key={j}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: cell ? Colors.primary : 'white',
                  margin: 1,
                }}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi código de acceso</Text>

      <View style={styles.qrContainer}>
        {renderQRCode()}
        <Text style={styles.codeText}>{accessCode}</Text>
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <MaterialCommunityIcons name="content-copy" size={22} color="white" />
        <Text style={styles.copyButtonText}>Copiar código</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        Este código es único para tu acceso al gimnasio.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 30,
    color: Colors.text,
  },
  qrContainer: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  codeText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  copyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
