import { firebase } from '../src/firebaseConfig';

const roomsRef = firebase.firestore().collection('multiplayerGames');

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
          });
          navigation.navigate('WaitingRoom', { user, code, isHost: false });
        } else {
          alert('Room does not exist!');
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
};

export const createRoom = (code, user, argument, navigation) => {
  let id = '';

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
