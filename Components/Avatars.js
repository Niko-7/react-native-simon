// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Text, Button } from 'react-native-paper';
// import { firebase } from '../src/firebaseConfig';

// const Avatars = ({ navigation, route, params }) => {
//   const [a, setA] = useState('');
//   const [b, setB] = useState('');
//   const [c, setC] = useState('');
//   const [d, setD] = useState('');
//   const [e, setE] = useState('');
//   const [f, setF] = useState('');
//   const [g, setG] = useState('');
//   const [h, setH] = useState('');
//   const [newImage, setNewImage] = useState('');

//   useEffect(() => {
//     const getAndLoadHttpUrl = async () => {
//       firebase
//         .storage()
//         .ref('/' + '3018391.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setA(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018392.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setB(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018386.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setC(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018396.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setD(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018383.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setE(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018384.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setF(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018385.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setG(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//       firebase
//         .storage()
//         .ref('/' + '3018388.png') //name in storage in firebase console
//         .getDownloadURL()
//         .then((url) => {
//           setH(url);
//         })
//         .catch((e) => console.log('Errors while downloading => ', e));
//     };
//     getAndLoadHttpUrl();
//   }, []);

//   let tttt = '1.png';
//   return (
//     <View>
//       <View style={styles.container}>
//         <Button
//           onPress={() => {

//             navigation.navigate('GameChoice', { img : setNewImage("1.png") });
//           }}
//         >
//           <Image style={styles.avatar} source={{ uri: a }} />
//         </Button>
//         <Image style={styles.avatar} source={{ uri: b }} />
//         <Image style={styles.avatar} source={{ uri: c }} />
//         <Image style={styles.avatar} source={{ uri: d }} />
//         <Image style={styles.avatar} source={{ uri: e }} />
//         <Image style={styles.avatar} source={{ uri: f }} />
//         <Image style={styles.avatar} source={{ uri: g }} />
//         <Image style={styles.avatar} source={{ uri: h }} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   avatar: {
//     width: 200,
//     height: 150,
//     marginLeft: 3,
//     marginTop: 10,
//   },
// });

// export default Avatars;
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
import { Button } from 'react-native-paper';

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
              <TouchableOpacity onPress={() => setImg('1.png')}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/1.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg = '2.png';
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/2.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg = '3.png';
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/3.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg = '4.png';
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/4.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg = '5.png';
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/5.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg = '6.png';
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/6.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg = '7.png';
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require('../assets/Avatars/7.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImg('8.png');
                }}
              >
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
