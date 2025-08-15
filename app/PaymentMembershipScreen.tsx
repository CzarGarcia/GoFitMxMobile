import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

// Datos de ejemplo
const currentPlan = {
  id: "1",
  name: "Plan Premium",
  price: "$29.99/mes",
  renewalDate: "15/07/2023",
  benefits: [
    "Acceso ilimitado",
    "Clases grupales incluidas",
    "2 entrenamientos personalizados/mes"
  ]
};

const availablePlans = [
  {
    id: "1",
    name: "Plan Básico",
    price: "$19.99/mes",
    benefits: [
      "Acceso ilimitado",
      "Clases grupales básicas"
    ]
  },
  {
    id: "2",
    name: "Plan Premium",
    price: "$29.99/mes",
    benefits: [
      "Acceso ilimitado",
      "Clases grupales premium",
      "2 entrenamientos personalizados/mes"
    ]
  },
  {
    id: "3",
    name: "Plan VIP",
    price: "$49.99/mes",
    benefits: [
      "Acceso ilimitado + invitado",
      "Todas las clases",
      "5 entrenamientos personalizados/mes",
      "Sauna incluido"
    ]
  }
];

const paymentHistory = [
  {
    id: "1",
    date: "15/06/2023",
    amount: "$29.99",
    method: "VISA •••• 4242",
    status: "Completado"
  }
];

export default function PaymentMembershipScreen() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });
  const [userPlan, setUserPlan] = useState(currentPlan);
  const [isCancelled, setIsCancelled] = useState(false);

  const handleChangePlan = (plan) => {
    setUserPlan(plan);
    setShowPlanModal(false);
    Alert.alert("Éxito", `Ahora tienes el ${plan.name}`);
  };

  const handleAddCard = () => {
    // Validación básica
    if (cardDetails.number.length < 16 || cardDetails.expiry.length < 5 || cardDetails.cvc.length < 3) {
      Alert.alert("Error", "Por favor completa todos los campos correctamente");
      return;
    }
    setShowCardModal(false);
    Alert.alert("Tarjeta agregada", "Tu método de pago se ha actualizado");
    setCardDetails({ number: '', expiry: '', cvc: '' });
  };

  const confirmCancel = () => {
    setIsCancelled(true);
    setShowCancelModal(false);
    Alert.alert("Membresía cancelada", "Tu plan se cancelará al finalizar el período actual");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <Text style={styles.title}>Pagos y Membresía</Text>

        {/* Información del Plan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu Plan Actual</Text>
          {isCancelled ? (
            <View style={styles.cancelledBadge}>
              <Text style={styles.cancelledText}>CANCELADO</Text>
            </View>
          ) : null}
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{userPlan.name}</Text>
            <Text style={styles.planPrice}>{userPlan.price}</Text>
          </View>
          <Text style={styles.renewalText}>
            Próxima renovación: {userPlan.renewalDate}
          </Text>
          
          <View style={styles.benefitsContainer}>
            {userPlan.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <MaterialCommunityIcons 
                  name="check-circle" 
                  size={16} 
                  color="#10B981" 
                />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.changePlanButton}
            onPress={() => setShowPlanModal(true)}
            disabled={isCancelled}
          >
            <Text style={styles.changePlanText}>
              {isCancelled ? "Plan Cancelado" : "Cambiar Plan"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Métodos de Pago */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Métodos de Pago</Text>
          <View style={styles.paymentMethod}>
            <MaterialCommunityIcons 
              name="credit-card" 
              size={24} 
              color={Colors.primary} 
            />
            <Text style={styles.paymentMethodText}>VISA •••• 4242</Text>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.addCardButton}
            onPress={() => setShowCardModal(true)}
          >
            <MaterialCommunityIcons 
              name="plus" 
              size={20} 
              color={Colors.primary} 
            />
            <Text style={styles.addCardButtonText}>Agregar nueva tarjeta</Text>
          </TouchableOpacity>
        </View>

        {/* Historial de Pagos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historial de Pagos</Text>
          {paymentHistory.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentDate}>{payment.date}</Text>
                <Text style={styles.paymentMethodDetail}>{payment.method}</Text>
              </View>
              <View style={styles.paymentAmountContainer}>
                <Text style={styles.paymentAmount}>{payment.amount}</Text>
                <Text style={styles.paymentStatus}>{payment.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Cancelar Membresía */}
        {!isCancelled && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => setShowCancelModal(true)}
          >
            <Text style={styles.cancelButtonText}>Cancelar Membresía</Text>
          </TouchableOpacity>
        )}

        {/* Modal: Cambiar Plan */}
        <Modal
          visible={showPlanModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPlanModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona un Plan</Text>
              <ScrollView>
                {availablePlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planOption,
                      plan.id === userPlan.id && styles.selectedPlan
                    ]}
                    onPress={() => handleChangePlan(plan)}
                  >
                    <Text style={styles.planOptionName}>{plan.name}</Text>
                    <Text style={styles.planOptionPrice}>{plan.price}</Text>
                    <View style={styles.planBenefits}>
                      {plan.benefits.map((benefit, index) => (
                        <Text key={index} style={styles.planBenefitText}>• {benefit}</Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowPlanModal(false)}
              >
                <Text style={styles.closeModalText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal: Agregar Tarjeta */}
        <Modal
          visible={showCardModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCardModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Agregar Tarjeta</Text>
              
              <Text style={styles.inputLabel}>Número de Tarjeta</Text>
              <TextInput
                style={styles.input}
                placeholder="4242 4242 4242 4242"
                keyboardType="numeric"
                maxLength={16}
                value={cardDetails.number}
                onChangeText={(text) => setCardDetails({...cardDetails, number: text})}
              />

              <View style={styles.rowInputs}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Vencimiento (MM/AA)</Text>
                  <TextInput
                    style={[styles.input, { width: '100%' }]}
                    placeholder="12/25"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChangeText={(text) => setCardDetails({...cardDetails, expiry: text})}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>CVC</Text>
                  <TextInput
                    style={[styles.input, { width: '100%' }]}
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={3}
                    value={cardDetails.cvc}
                    onChangeText={(text) => setCardDetails({...cardDetails, cvc: text})}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleAddCard}
              >
                <Text style={styles.confirmButtonText}>Guardar Tarjeta</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowCardModal(false)}
              >
                <Text style={styles.closeModalText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal: Cancelar Membresía */}
        <Modal
          visible={showCancelModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowCancelModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <MaterialCommunityIcons 
                name="alert-circle" 
                size={50} 
                color="#EF4444" 
                style={styles.cancelIcon}
              />
              <Text style={styles.modalTitle}>¿Cancelar Membresía?</Text>
              <Text style={styles.cancelWarningText}>
                Tu acceso continuará hasta {userPlan.renewalDate}. 
                ¿Estás seguro de que deseas cancelar?
              </Text>
              
              <View style={styles.cancelModalButtons}>
                <TouchableOpacity
                  style={[styles.cancelActionButton, styles.cancelConfirmButton]}
                  onPress={confirmCancel}
                >
                  <Text style={styles.cancelActionButtonText}>Sí, Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cancelActionButton, styles.cancelGoBackButton]}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Text style={styles.cancelActionButtonText}>Volver</Text>
                </TouchableOpacity>
              </View>
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
    paddingHorizontal: width * 0.04,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  cancelledBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FEE2E2',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  cancelledText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 15,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  renewalText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 15,
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 15,
    color: Colors.text,
    marginLeft: 8,
  },
  changePlanButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  changePlanText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  paymentMethodText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 15,
    flex: 1,
  },
  removeButton: {
    paddingHorizontal: 10,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  addCardButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 10,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 3,
  },
  paymentMethodDetail: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  paymentAmountContainer: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  paymentStatus: {
    fontSize: 13,
    color: '#10B981',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  // Estilos para modales
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.card,
    width: width * 0.9,
    maxHeight: '80%',
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
  closeModalButton: {
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  closeModalText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  // Estilos para opciones de plan
  planOption: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  selectedPlan: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F9FF',
  },
  planOptionName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  planOptionPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginVertical: 5,
  },
  planBenefits: {
    marginTop: 5,
  },
  planBenefitText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 3,
  },
  // Estilos para formulario de tarjeta
  inputLabel: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Estilos para modal de cancelación
  cancelIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  cancelWarningText: {
    fontSize: 15,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  cancelModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelActionButton: {
    flex: 1,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  cancelConfirmButton: {
    backgroundColor: '#FEE2E2',
    marginRight: 10,
  },
  cancelGoBackButton: {
    backgroundColor: '#E5E7EB',
  },
  cancelActionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});