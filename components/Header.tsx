import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function CleanHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* Fondo con gradiente sutil */}
      <LinearGradient
        colors={['rgba(248,250,252,0.98)', 'rgba(241,245,249,0.98)']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Contenido del header */}
      <View style={styles.headerContent}>
        {/* Logo con icono */}
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons 
            name="lightning-bolt" 
            size={26} 
            color={Colors.primary}
            style={styles.logoIcon}
          />
          <Text style={styles.logoText}>
            GO<Text style={{ color: Colors.secondary }}>FIT</Text>MX
          </Text>
        </View>

        {/* Iconos de acción (solo notificaciones y perfil) */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationWrapper}>
              <Ionicons name="notifications-outline" size={22} color={Colors.text} />
              <View style={styles.notificationBadge} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.userButton}>
            <Text style={styles.userInitial}>U</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Borde inferior sutil */}
      <View style={styles.headerBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    width: '100%',
    paddingTop: 35,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: Colors.text,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    padding: 6,
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.notification,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
  },
  userButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  userInitial: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  headerBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
  },
});