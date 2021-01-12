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
  console.log('running');

  roomsRef
    .where('roomCode', '==', code)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const roomId = doc.id;
        console.log(roomId);

        if (doc.exists) {
          console.log('in exists');
          roomsRef.doc(roomId).collection('users').doc(user.username).set({
            username: user.username,
            userId: user.id,
            userImg: user.userImg,
            score: 0,
            argument: argument,
            isHost: false,
          });
          // navigation.navigate('WaitingRoom', { user, code, isHost: false });
          console.log('got here');
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
  let id = '';
  const code = generateRoomCode();

  roomsRef
    .add({
      roomCode: code,
      createdAt: new Date().toISOString(),
      gameIsActive: false,
      host: user,
      playersGameOver: [],
      winner: null,
    })
    .then((doc) => {
      id = doc.id;
    })
    .then((id) => {
      console.log(id);
      roomsRef.doc(id).collection('users').doc(user.username).add({
        username: user.username,
        userId: user.id,
        userImg: user.userImg,
        score: 0,
        argument: argument,
        isHost: true,
      });
    })
    // .then(() => {
    //   roomsRef
    //     .where('roomCode', '==', code)
    //     .get()
    //     .then((querySnapshot) => {
    //       return querySnapshot.forEach((doc) => {
    //         return doc.id;
    //       });
    //     });
    // })
    // .then((id) => {
    //   navigation.navigate('WaitingRoom', { user, code, isHost: true, id });
    // })
    .catch((err) => {
      console.error(err);
    });
};
