import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

const { height } = Dimensions.get('window');
const MENU_HEIGHT = height * 0.75; // 75% de la pantalla

export default function FullHeightMenu() {
  const menuVisible = useSharedValue(false);
  const translateY = useSharedValue(height);

  const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
    translateY.value = withSpring(menuVisible.value ? height - MENU_HEIGHT : height, {
      damping: 25,
      stiffness: 300
    });
  };

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    height: MENU_HEIGHT,
  }));

  return (
    <>
      {/* Botón de menú flotante */}
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={toggleMenu}
      >
        <MaterialCommunityIcons 
          name={menuVisible.value ? "close" : "menu"} 
          size={28} 
          color="white"
        />
      </TouchableOpacity>

      {/* Menú completo */}
      <Animated.View style={[styles.menu, menuStyle]}>
        <LinearGradient
          colors={['rgba(30, 41, 59, 0.98)', 'rgba(15, 23, 42, 0.98)']}
          style={StyleSheet.absoluteFill}
        />
        
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>GOFITMX</Text>
          <Text style={styles.subtitle}>Menú principal</Text>
        </View>

        {/* Lista desplazable */}
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <MenuItem icon="account" label="Mi perfil" />
          <MenuItem icon="home" label="Inicio" />
          <MenuItem icon="calendar" label="Agenda" count="12" />
          <MenuItem icon="credit-card" label="Pagos y membresía" />
          <MenuItem icon="chart-line" label="Estadísticas" />
          <MenuItem icon="trophy" label="Logros" />
          
          {/* Sección QR */}
          <View style={styles.qrSection}>
            <Text style={styles.sectionTitle}>TU CÓDIGO QR</Text>
            <View style={styles.qrContainer}>
              <MaterialCommunityIcons 
                name="qrcode" 
                size={150} 
                color={Colors.primary}
              />
              <Text style={styles.qrText}>ID: GFXM-USER-12345</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
}

const MenuItem = ({ icon, label, count }: { icon: string, label: string, count?: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.itemContent}>
      <MaterialCommunityIcons 
        name={icon} 
        size={26} 
        color="white" 
        style={styles.itemIcon}
      />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    {count && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    )}
    <MaterialCommunityIcons 
      name="chevron-right" 
      size={20} 
      color={Colors.textMuted} 
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menu: {
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 5,
    overflow: 'hidden',
  },
  header: {
    padding: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 18,
    width: 26,
  },
  itemLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  badge: {
    backgroundColor: Colors.notification,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 15,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  qrSection: {
    marginTop: 20,
    padding: 25,
    paddingTop: 15,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 1,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'rgba(34, 211, 238, 0.08)',
    borderRadius: 20,
  },
  qrText: {
    color: Colors.primary,
    marginTop: 15,
    fontWeight: '600',
    fontSize: 14,
  },
});