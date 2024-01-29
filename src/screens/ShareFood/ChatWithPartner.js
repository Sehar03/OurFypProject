import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileHeader from '../../components/headers/ProfileHeader';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AppColors from '../../assets/colors/AppColors';
import AppContext from '../../Context/AppContext';

const ChatWithPartner = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const { currentUser, baseUrl } = useContext(AppContext);
  const { reservationId } = route.params;
  const [newReservation, setNewReservation] = useState(null);

  const viewSingleReservation = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/viewSingleReservation/${reservationId}`
      );
      if (response.data && response.data.length > 0) {
        setNewReservation(response.data[0]);
        console.log('singleReservation', response.data[0]);
      } else {
        console.error('No data found for reservation:', reservationId);
      }
    } catch (error) {
      console.error('Error fetching reservation:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      viewSingleReservation();
    }, [])
  );

  useEffect(() => {
    if (newReservation) {
      const senderId = newReservation.requestSender_id;
      const receiverId = newReservation.requestReceiver_id;

      const chatId = [senderId, receiverId].sort().join('_');

      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const allMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
            };
          });

          setMessages(allMessages);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [newReservation]);

  const onSend = async messageArray => {
    const msg = messageArray[0];

    const myMsg = {
      ...msg,
      senderId: newReservation.requestSender_id,
      receiverId: newReservation.requestReceiver_id,
      createdAt: new Date(),
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMsg)
    );

    const chatId = [newReservation.requestSender_id, newReservation.requestReceiver_id]
      .sort()
      .join('_');

    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(myMsg);
  };

  const renderSend = props => (
    <TouchableOpacity
      onPress={() => props.onSend({ text: props.text.trim() }, true)}
      style={{ marginRight: 10, marginBottom: 5 }}
    >
      <Ionicons name="send-sharp" size={25} color={'#4682B4'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
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
