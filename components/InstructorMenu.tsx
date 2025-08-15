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

export default function InstructorMenu() {
  const router = useRouter();

  const menuVisible = useSharedValue(false);
  const translateY = useSharedValue(height);

  const openMenu = () => {
    menuVisible.value = true;
    translateY.value = withSpring(height - MENU_HEIGHT, { damping: 25, stiffness: 300 });
  };

  const closeMenu = () => {
    menuVisible.value = false;
    translateY.value = withSpring(height, { damping: 25, stiffness: 300 });
  };

  const toggleMenu = () => {
    if (menuVisible.value) closeMenu();
    else openMenu();
  };

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    height: MENU_HEIGHT,
  }));

  const onPressNavigate = (route: string) => {
    closeMenu();
    setTimeout(() => router.push(`/${route}`), 300);
  };

  return (
    <>
      {/* Botón flotante */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <MaterialCommunityIcons
          name={menuVisible.value ? "close" : "menu"}
          size={28}
          color="white"
        />
      </TouchableOpacity>

      {/* Menú completo */}
      <Animated.View style={[styles.menu, menuStyle]}>
        <LinearGradient
          colors={['rgba(30,41,59,0.98)', 'rgba(15,23,42,0.98)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Instructor GOFITMX</Text>
          <Text style={styles.subtitle}>Menú principal</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <MenuItem
            icon="account"
            label="Mi perfil"
            onPress={() => onPressNavigate('instructor/profile')}
          />
          <MenuItem
            icon="calendar-check"
            label="Asistencias"
            onPress={() => onPressNavigate('instructor/attendance')}
          />
          <MenuItem
            icon="qrcode"
            label="Mi código de acceso"
            onPress={() => onPressNavigate('instructor/qr')}
          />
          <MenuItem
            icon="account-group"
            label="Clientes asignados"
            onPress={() => onPressNavigate('instructor/clients')}
          />
          <MenuItem
            icon="bell"
            label="Recordatorios"
            onPress={() => onPressNavigate('instructor/reminders')}
          />
        </ScrollView>
      </Animated.View>
    </>
  );
}

const MenuItem = ({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.itemContent}>
      <MaterialCommunityIcons name={icon} size={26} color="white" style={styles.itemIcon} />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
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
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 30 },
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
  itemIcon: { marginRight: 18, width: 26 },
  itemLabel: { color: 'white', fontSize: 16, fontWeight: '500', flex: 1 },
});
