import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your icon library
import AppColors from '../../assets/colors/AppColors';
import AppContext from '../../Context/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileHeader from '../../components/headers/ProfileHeader';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

const ChatWithPartner = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const {currentUser, baseUrl,} = useContext(AppContext);
  const {reservationId} =route.params;
  console.log('kdfkdhjfh', reservationId);
  const [newReservation, setNewReservation] = useState([]);
  const viewSingleReservation = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewSingleReservation/${reservationId}`,
      );
      setNewReservation(response.data[0]);
  
      console.log('singleReservation', response.data[0]);
    } catch (error) {
      console.error('Error fetching  reservation:', error);
    }
  };

  {console.log('////////////',newReservation.requestReceiver_id)}
  useFocusEffect(
    React.useCallback(() => {
      viewSingleReservation();
    }, []),
  );
  useEffect(() => {
    viewSingleReservation();
  }, []);
  useEffect(() => {
    const querySnapShot = firestore()
      .collection('chats')
      .doc('123456789')
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = querySnapShot.onSnapshot(snapShot => {
      const allMessages = snapShot.docs.map(snap => {
        const createdAt = snap.data().createdAt?.toDate() || new Date(); // Handle null case
        return {
          ...snap.data(),
          createdAt,
        };
      });

      setMessages(allMessages);
    });

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribe();
    };
  }, []);
  const onSend = messageArray => {
    const msg = messageArray[0];
    const myMsg = {
      ...msg,
      senderId: currentUser.userId,
      recieverId: newReservation.requestReceiver_id,
    };

    setMessages(previousMessages => {
      // Append the new message
      const updatedMessages = GiftedChat.append(previousMessages, myMsg);

      // Sort the messages by createdAt in descending order
      const sortedMessages = updatedMessages.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );

      return sortedMessages;
    });

    firestore()
      .collection('chats')
      .doc('123456789')
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  const renderSend = props => (
    <TouchableOpacity
      onPress={() => props.onSend({text: props.text.trim()}, true)}
      style={{marginRight: 10, marginBottom: 5}}>
      <Ionicons name="send-sharp" size={25} color={'#4682B4'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <ProfileHeader navigation={navigation} item="Chat" />

      <GiftedChat
        messages={messages}
        onSend={messageArray => onSend(messageArray)}
        user={{
          _id: currentUser.userId,
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#4682B4',
              },
            }}
          />
        )}
        renderSend={renderSend}
      />
    </SafeAreaView>
  );
};

export default ChatWithPartner;
