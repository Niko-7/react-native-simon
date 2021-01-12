import { firebase } from '../src/firebaseConfig';

const roomsRef = firebase.firestore().collection('multiplayerGames');

const generateRoomCode = () => {
  let result = '';
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 4; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
};

export const joinRoom = (code, user, argument, navigation) => {
  roomsRef
    .where('roomCode', '==', code)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const roomId = doc.id;

        if (doc.exists) {
          roomsRef.doc(roomId).collection('users').doc(user.username).set({
            username: user.username,
            userId: user.id,
            userImg: user.userImg,
            score: 0,
            argument: argument,
            isHost: false,
            gameOver: false
          });
          navigation.navigate('WaitingRoom', {
            user,
            code,
            roomId
          });
        } else {
          alert('Room does not exist!');
        }
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};

export const createRoom = (user, argument, navigation) => {
  const code = generateRoomCode();

  roomsRef
    .add({
      roomCode: code,
      createdAt: new Date().toISOString(),
      gameIsActive: false,
      host: { username: user.username, userId: user.id },
      playersGameOver: [],
      winner: null
    })
    .then(() => {
      addHost(code, user, argument, navigation);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const addHost = (code, user, argument, navigation) => {
  roomsRef
    .where('roomCode', '==', code)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const roomId = doc.id;

        if (doc.exists) {
          roomsRef.doc(roomId).collection('users').doc(user.username).set({
            username: user.username,
            userId: user.id,
            userImg: user.userImg,
            score: 0,
            argument: argument,
            isHost: true,
            gameOver: false
          });
          navigation.navigate('WaitingRoom', {
            user,
            code,
            roomId,
            argument
          });
        } else {
          alert('Room does not exist!');
        }
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
