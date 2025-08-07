import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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
  const router = useRouter();

  const menuVisible = useSharedValue(false);
  const translateY = useSharedValue(height);

  const openMenu = () => {
    menuVisible.value = true;
    translateY.value = withSpring(height - MENU_HEIGHT, {
      damping: 25,
      stiffness: 300
    });
  };

  const closeMenu = () => {
    menuVisible.value = false;
    translateY.value = withSpring(height, {
      damping: 25,
      stiffness: 300
    });
  };

  const toggleMenu = () => {
    if (menuVisible.value) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    height: MENU_HEIGHT,
  }));

  // Función para cerrar menú y navegar
  const onPressNavigate = (route: string) => {
    closeMenu();
    setTimeout(() => {
      router.push(`/${route}`);
    }, 300); // espera un poco para que la animación termine
  };

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
          <MenuItem
            icon="account"
            label="Mi perfil"
            onPress={() => onPressNavigate('ProfileScreen')}
          />
          <MenuItem
            icon="home"
            label="Inicio"
            onPress={() => onPressNavigate('home')}
          />
          <MenuItem
            icon="calendar"
            label="Agenda"
            count="12" // cambia a tu ruta real
          />
          <MenuItem
            icon="credit-card"
            label="Pagos y membresía" // cambia a tu ruta real
          />
          <MenuItem
            icon="chart-line"
            label="Estadísticas" // cambia a tu ruta real
          />
          <MenuItem
            icon="trophy"
            label="Logros"// cambia a tu ruta real
          />

          {/* Sección QR */}
          <TouchableOpacity
            style={styles.qrContainer}
            onPress={() => onPressNavigate('QRScreen')}
          >
            <MaterialCommunityIcons name="qrcode" size={150} color={Colors.primary} />
            <Text style={styles.qrText}>ID: GFXM-USER-12345</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </>
  );
}

// Modificamos MenuItem para aceptar onPress
const MenuItem = ({ icon, label, count, onPress }: { icon: string, label: string, count?: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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
