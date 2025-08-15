// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'razc320' && password === 'razc320') {
      router.replace('/home'); // Usuario normal
    } else if (email === 'instructor' && password === 'instructor') {
      router.replace('/InstructorHomeScreen'); // Usuario instructor
    } else {
      alert('Credenciales incorrectas 🥲');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animatable.View
        animation="fadeInUp"
        delay={300}
        duration={800}
        style={styles.loginBox}
      >
        <Animatable.Text
          animation="fadeInDown"
          delay={500}
          style={styles.title}
        >
          Bienvenido a GOFITMX 👋
        </Animatable.Text>

        {/* Email */}
        <Animatable.View
          animation="fadeInLeft"
          delay={700}
          style={styles.inputContainer}
        >
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animatable.View>

        {/* Password */}
        <Animatable.View
          animation="fadeInRight"
          delay={900}
          style={styles.inputContainer}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Animatable.View>

        {/* Botón login */}
        <Animatable.View animation="pulse" delay={1100} iterationCount="infinite">
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.Text animation="fadeInUp" delay={1300} style={styles.footerText}>
          ¿Olvidaste tu contraseña? 🙃
        </Animatable.Text>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loginBox: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 380,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#111827',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
});
