import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome6';

const SendAlert = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  let toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text>Send Message</Text>
      </TouchableOpacity>
        
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
            
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  addButton: {},
  modal: {},
});

export default SendAlert;
