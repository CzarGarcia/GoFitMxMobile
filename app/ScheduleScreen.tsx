import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Configuración de colores
const Colors = {
  primary: '#3B82F6',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1F2937',
  textMuted: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444'
};

// Configuración de idioma
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles',
    'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

// Datos ficticios de asistencia
const attendanceData = {
  '2025-08-01': [
    {
      id: '5',
      checkInTime: '07:30 AM',
      checkOutTime: '08:45 AM',
      instructor: 'Laura Ramírez',
      activity: 'Entrenamiento Funcional',
      duration: '1 hora 15 min',
      calories: '330 kcal',
      status: 'Completado',
      notes: 'Buen control postural durante el circuito'
    }
  ],
  '2025-08-02': [
    {
      id: '6',
      checkInTime: '08:00 AM',
      checkOutTime: '09:00 AM',
      instructor: 'José Martínez',
      activity: 'Cardio',
      duration: '1 hora',
      calories: '400 kcal',
      status: 'Completado',
      notes: 'Mantuvo ritmo constante durante la caminadora'
    }
  ],
  '2025-08-05': [
    {
      id: '7',
      checkInTime: '06:45 AM',
      checkOutTime: '08:00 AM',
      instructor: 'Carla Gómez',
      activity: 'Pesas',
      duration: '1 hora 15 min',
      calories: '370 kcal',
      status: 'Completado',
      notes: 'Incrementó repeticiones en sentadillas'
    }
  ],
  '2025-08-06': [
    {
      id: '8',
      checkInTime: '07:15 AM',
      checkOutTime: '08:30 AM',
      instructor: 'Luis Herrera',
      activity: 'Yoga',
      duration: '1 hora 15 min',
      calories: '250 kcal',
      status: 'Completado',
      notes: 'Respiración y concentración mejoradas'
    }
  ]
};


export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayAttendances, setSelectedDayAttendances] = useState([]);

  // Configurar días marcados
  const markedDates = {};
  
  Object.keys(attendanceData).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: Colors.primary,
      selected: date === selectedDate,
      selectedColor: Colors.primary,
      selectedTextColor: 'white',
      customStyles: {
        container: {
          backgroundColor: date === selectedDate ? Colors.primary : '#EFF6FF',
          borderRadius: 8
        },
        text: {
          color: date === selectedDate ? 'white' : Colors.text,
          fontWeight: date === selectedDate ? 'bold' : 'normal'
        }
      }
    };
  });

  // Asegurar que el día seleccionado siempre esté marcado
  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: Colors.primary,
    selectedTextColor: 'white'
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    
    if (attendanceData[day.dateString]) {
      setSelectedDayAttendances(attendanceData[day.dateString]);
      setShowModal(true);
    }
  };

  // Calcular resumen
  const totalDays = Object.keys(attendanceData).length;
  const totalSessions = Object.values(attendanceData).reduce((total, day) => total + day.length, 0);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mi Asistencia</Text>
        
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={handleDayPress}
            markedDates={markedDates}
            renderArrow={(direction) => (
              <MaterialCommunityIcons 
                name={`chevron-${direction}`} 
                size={24} 
                color={Colors.primary} 
              />
            )}
            theme={{
              backgroundColor: Colors.card,
              calendarBackground: Colors.card,
              selectedDayBackgroundColor: Colors.primary,
              selectedDayTextColor: '#ffffff',
              todayTextColor: Colors.primary,
              dayTextColor: Colors.text,
              monthTextColor: Colors.text,
              arrowColor: Colors.primary,
              textDisabledColor: '#94a3b8',
              textSectionTitleColor: Colors.primary,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              }
            }}
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>RESUMEN DE ASISTENCIA</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="calendar-check" size={20} color={Colors.primary} />
              <Text style={styles.summaryText}>Días asistidos: {totalDays}</Text>
            </View>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="dumbbell" size={20} color={Colors.success} />
              <Text style={styles.summaryText}>Sesiones: {totalSessions}</Text>
            </View>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="fire" size={20} color={Colors.danger} />
              <Text style={styles.summaryText}>Promedio por sesión: 1h 10min</Text>
            </View>
          </View>
        </View>

        {/* Modal de Detalles */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Detalles - {new Date(selectedDate).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </Text>
              
              <ScrollView style={styles.modalScroll}>
                {selectedDayAttendances.map((attendance) => (
                  <View key={attendance.id} style={styles.attendanceCard}>
                    <View style={styles.attendanceHeader}>
                      <MaterialCommunityIcons name="clock-outline" size={20} color={Colors.primary} />
                      <Text style={styles.attendanceTime}>
                        {attendance.checkInTime} - {attendance.checkOutTime}
                      </Text>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: attendance.status === 'Completado' ? '#D1FAE5' : '#FEE2E2' }
                      ]}>
                        <Text style={[
                          styles.statusText,
                          { color: attendance.status === 'Completado' ? '#065F46' : '#B91C1C' }
                        ]}>
                          {attendance.status}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="account" size={18} color={Colors.textMuted} />
                      <Text style={styles.detailText}>{attendance.instructor}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="dumbbell" size={18} color={Colors.textMuted} />
                      <Text style={styles.detailText}>{attendance.activity}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="timer" size={18} color={Colors.textMuted} />
                      <Text style={styles.detailText}>{attendance.duration}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons name="fire" size={18} color={Colors.textMuted} />
                      <Text style={styles.detailText}>{attendance.calories} quemadas</Text>
                    </View>
                    
                    {attendance.notes && (
                      <View style={styles.notesContainer}>
                        <Text style={styles.notesLabel}>Notas del instructor:</Text>
                        <Text style={styles.notesText}>{attendance.notes}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 20,
  },
  calendarContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: 15,
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  summaryText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 10,
  },
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.card,
    width: '100%',
    maxHeight: height * 0.8,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: height * 0.6,
  },
  attendanceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  attendanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  attendanceTime: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
    marginRight: 'auto',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    color: Colors.text,
    marginLeft: 8,
  },
  notesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  notesLabel: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: Colors.text,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});