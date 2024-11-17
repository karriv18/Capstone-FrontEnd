import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome6';

const SendAlert = ({ visible, texType }) => {

  return (
    <View style={styles.body}>
      <Modal visible={visible} onRequestClose={false} transparent>
        <View style={styles.centered_modal}>
          <View style={styles.modal}>
            <View style={styles.warning_style}>
              <Text style={styles.textColor}>Send a Message</Text>
            </View>
            <View style={styles.warning_body}>
              <Text>
                Send a Message
              </Text>
            </View>
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {},
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  textColor: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  addButton: {
    width: 150,
    height: 50,
    alignItems: 'center'
  },
  centered_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000', 
  },
  warning_style: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  sendButtonText: {
    color: '#000',
    fontSize: 20,
    margin: 10,
  }
});

export default SendAlert;
