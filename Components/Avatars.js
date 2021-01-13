import React, { useState, useEffect } from 'react';
import { firebase } from '../src/firebaseConfig';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const AvatarModal = ({ updateAvatar }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userImg, setImg] = useState('');

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setImg('3018383.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/1.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018384.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/2.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018385.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/3.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018386.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/4.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018388.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/5.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018391.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/6.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018392.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/7.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImg('3018396.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/8.png')}
                />
              </TouchableOpacity>
            </View>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                updateAvatar(userImg);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Change Avatar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '100%',
    height: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: 5,
    marginLeft: 3,
  },
});

export default AvatarModal;
