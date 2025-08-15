import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

// Componente principal
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Calcula tamaños responsivos
  const responsiveValue = (mobileValue: number, tabletValue: number) => 
    width >= 768 ? tabletValue : mobileValue;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + responsiveValue(20, 40) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>¡Hola, Alejandro!</Text>
          <Text style={styles.subtitle}>Tu progreso hoy</Text>
        </View>

        {/* Tarjeta de estado activo */}
        <TouchableOpacity style={styles.statusCard}>
          <LinearGradient
            colors={['#22d3ee', '#4facfe']}
            style={styles.statusGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>ENTRENAMIENTO ACTIVO</Text>
              <Text style={styles.statusText}>Rutina: Fuerza Superior</Text>
              <Text style={styles.statusText}>Siguiente: Press Banca (3x8)</Text>
            </View>
            <MaterialCommunityIcons 
              name="lightning-bolt" 
              size={responsiveValue(40, 50)} 
              color="white"
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Acciones rápidas */}
        <View style={styles.quickActions}>
          {[
            { icon: 'qrcode', label: 'Mi QR' },
            { icon: 'calendar', label: 'Agenda' },
            { icon: 'chart-bar', label: 'Progreso' }
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickAction}
            >
              <View style={[
                styles.quickActionIcon,
                { 
                  width: responsiveValue(50, 70),
                  height: responsiveValue(50, 70)
                }
              ]}>
                <MaterialCommunityIcons 
                  name={action.icon} 
                  size={responsiveValue(24, 28)} 
                  color={Colors.primary} 
                />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sección de rutinas */}
        <Text style={styles.sectionTitle}>TUS RUTINAS</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {[
            { title: "Fuerza Total", duration: "45 min", progress: 72, icon: "arm-flex" },
            { title: "Quema Grasa", duration: "60 min", progress: 35, icon: "fire" },
            { title: "Flexibilidad", duration: "30 min", progress: 90, icon: "yoga" },
            { title: "Cardio", duration: "40 min", progress: 60, icon: "run" }
          ].map((routine, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.routineCard,
                { width: responsiveValue(160, 200) }
              ]}
            >
              <View style={styles.routineHeader}>
                <MaterialCommunityIcons 
                  name={routine.icon} 
                  size={responsiveValue(24, 28)} 
                  color={Colors.primary} 
                />
                <Text style={styles.routineTitle}>{routine.title}</Text>
              </View>
              <Text style={styles.routineDuration}>{routine.duration}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View style={[
                    styles.progressFill,
                    { width: `${routine.progress}%` }
                  ]} />
                </View>
                <Text style={styles.progressText}>{routine.progress}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sección de clases */}
        <Text style={styles.sectionTitle}>CLASES HOY</Text>
        <View style={styles.classesContainer}>
          {[
            { 
              time: "08:00", 
              name: "CrossFit Avanzado", 
              instructor: "Carlos M.", 
              spots: 3 
            },
            { 
              time: "12:30", 
              name: "Yoga Power", 
              instructor: "Ana L.", 
              spots: 0 
            },
            { 
              time: "18:00", 
              name: "HIIT", 
              instructor: "Juan P.", 
              spots: 5 
            }
          ].map((classItem, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.classItem,
                classItem.spots === 0 && styles.classItemFull
              ]}
            >
              <View style={styles.classTime}>
                <Text style={styles.classTimeText}>{classItem.time}</Text>
              </View>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{classItem.name}</Text>
                <Text style={styles.classInstructor}>{classItem.instructor}</Text>
              </View>
              <View style={[
                styles.classSpots,
                classItem.spots === 0 ? styles.classSpotsFull : null
              ]}>
                <Text style={[
                  styles.classSpotsText,
                  classItem.spots === 0 ? styles.classSpotsFullText : null
                ]}>
                  {classItem.spots === 0 ? 'Lleno' : `${classItem.spots} lugares`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos optimizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    paddingHorizontal: width >= 768 ? 24 : 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
  greeting: {
    fontSize: width >= 768 ? 32 : 28,
    fontWeight: '800',
    color: Colors.text,
    maxWidth: '80%',
  },
  subtitle: {
    fontSize: width >= 768 ? 18 : 16,
    color: Colors.textMuted,
    marginTop: 4,
  },
  statusCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: height * 0.03,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  statusGradient: {
    padding: width >= 768 ? 24 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: height * 0.15,
  },
  statusContent: {
    flex: 1,
    marginRight: 10,
  },
  statusTitle: {
    color: 'white',
    fontSize: width >= 768 ? 18 : 16,
    fontWeight: '700',
    marginBottom: height * 0.01,
    letterSpacing: 0.5,
  },
  statusText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: width >= 768 ? 16 : 14,
    marginBottom: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.04,
  },
  quickAction: {
    alignItems: 'center',
    width: (width - (width >= 768 ? 72 : 48)) / 3,
  },
  quickActionIcon: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: width >= 768 ? 16 : 14,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: width >= 768 ? 20 : 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: height * 0.02,
    marginTop: height * 0.03,
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  routineCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: width >= 768 ? 20 : 15,
    marginRight: width >= 768 ? 20 : 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  routineTitle: {
    fontSize: width >= 768 ? 18 : 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  routineDuration: {
    fontSize: width >= 768 ? 14 : 13,
    color: Colors.textMuted,
    marginBottom: height * 0.02,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: width >= 768 ? 14 : 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  classesContainer: {
    marginBottom: height * 0.05,
  },
  classItem: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: width >= 768 ? 20 : 15,
    marginBottom: height * 0.015,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  classItemFull: {
    opacity: 0.6,
  },
  classTime: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 8,
    padding: width >= 768 ? 10 : 8,
    marginRight: width >= 768 ? 20 : 15,
  },
  classTimeText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: width >= 768 ? 16 : 14,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: width >= 768 ? 18 : 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  classInstructor: {
    fontSize: width >= 768 ? 14 : 13,
    color: Colors.textMuted,
  },
  classSpots: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 6,
    paddingHorizontal: width >= 768 ? 12 : 8,
    paddingVertical: width >= 768 ? 6 : 4,
  },
  classSpotsFull: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  classSpotsText: {
    fontSize: width >= 768 ? 14 : 12,
    fontWeight: '600',
    color: '#10B981',
  },
  classSpotsFullText: {
    color: '#EF4444',
  },
});