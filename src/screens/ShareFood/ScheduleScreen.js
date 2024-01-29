import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import AppContext from '../../Context/AppContext';
import TabBarStyles from '../../assets/Styles/TabBarStyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabScreensHeader from '../../components/headers/TabScreensHeader';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import SharedFoodCard from '../../components/Cards/SharedFoodCard';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconStyles from '../../assets/Styles/IconStyles';
import TextStyles from '../../assets/Styles/TextStyles';

const Tab = createMaterialTopTabNavigator();

const MySharedFood = ({ navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [myShareFood, setMyShareFood] = useState([]);
  const viewAllShareFoodProducts = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
      );
      const pendingReservation = response.data.filter(order => order.status === 'Pending');
      setMyShareFood(pendingReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllShareFoodProducts();
    }, []),
  );
  useEffect(() => {
    viewAllShareFoodProducts();
  }, []);

  const route = useRoute();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {myShareFood.length === 0 ? (
        <View style={[ContainerStyles.centerView]}>
          <Text>You not share any food.</Text>
        </View>
      ) : (
        <View style={{alignSelf:"center",marginTop:hp(1)}}>
        <Neomorph
        darkShadowColor={AppColors.primary}
        lightShadowColor={AppColors.background}
        swapShadows // <- change zIndex of each shadow color
        style={[
          
          { 
          // overflow: 'hidden',
          width:wp('95'),
          height:hp(10),
          borderRadius: wp('1'),
          shadowRadius: 1,
          backgroundColor:AppColors.white,
          // backgroundColor: "#bed5f326",
          shadowOpacity: 0.4,
        }

        ]}>
       <View style={{flexDirection:"row",flex:1}}>
       <AntDesign name="message1" size={20} style={[IconStyles.messageIcon]} />
        <Text style={[TextStyles.messageStyle]}>You have shared these food options. Others can view and select their preferences. Once confirmed, the reservation will be finalized.</Text>
        </View>
        </Neomorph>
        <FlatList
          data={myShareFood}
          renderItem={({ item }) => {
            return (
              <SharedFoodCard
                navigation={navigation}
                item={item}
                currentOrderRoute={route.name}
              />
            )
          }}
        />
        </View>
      )}

    </SafeAreaView>
  );
};
const SharedFood = ({ navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [allSharedFood, setAllSharedFood] = useState([]);

  const viewAllSharedFoodProducts = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllSharedFoodProducts/${currentUser.userId}`,
      );
      const pendingReservation = response.data.filter(order => order.status === 'Pending');
      setAllSharedFood(pendingReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      viewAllSharedFoodProducts();
    }, []),
  );

  useEffect(() => {
    viewAllSharedFoodProducts();
  }, []);

  const route = useRoute();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {allSharedFood.length === 0 ? (
        <View style={[ContainerStyles.centerView]}>
          <Text>No one has shared any food yet.</Text>
        </View>
      ) : (
        <View style={{alignSelf:"center",marginTop:hp(1)}}>
        <Neomorph
        darkShadowColor={AppColors.primary}
        lightShadowColor={AppColors.background}
        swapShadows // <- change zIndex of each shadow color
        style={[
          ContainerStyles.ScheduleCardNeomorph,
          { overflow: 'hidden',height:hp(10)},
        ]}>
       <View style={{flexDirection:"row",marginTop:hp('1.6')}}>
       <AntDesign name="message1" size={20} style={[IconStyles.messageIcon]} />
        <Text style={[TextStyles.messageStyle]}>Others have shared these foods, and you can choose any according to your preference and confirm them.</Text>
        </View>
        </Neomorph>
        <FlatList
          data={allSharedFood}
          renderItem={({ item }) => {
            return (
              <SharedFoodCard
                navigation={navigation}
                item={item}
                currentOrderRoute={route.name}
              />

            );
          }}
        />
        </View>
      )}
    </SafeAreaView>
  );
};



const ConfirmedShareFood = ({ navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [yourConfirmedFood, setYourConfirmedFood] = useState([]);

  const ConfirmedShareFood = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
      );
      const ConfirmedReservation = response.data.filter(order => order.status === 'Ongoing');
      setYourConfirmedFood(ConfirmedReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      ConfirmedShareFood();
    }, []),
  );
  useEffect(() => {
    ConfirmedShareFood();
  }, []);

  const route = useRoute();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {yourConfirmedFood.length === 0 ? (
        <View style={[ContainerStyles.centerView]}>
          <Text>No food sharing has been confirmed Yet</Text>
        </View>
      ) : (
        <FlatList
          data={yourConfirmedFood}
          renderItem={({ item }) => {
            return (
              <SharedFoodCard
                navigation={navigation}
                item={item}
                currentOrderRoute={route.name}
              />
            );
          }}
        />
      )
      }
    </SafeAreaView>
  );
};

const CompletedShareFood = ({ navigation }) => {
  const { baseUrl, currentUser } = useContext(AppContext);
  const [yourCompletedSharedFood, setYourCompletedShareFood] = useState([]);

  const CompletedShareFood = async () => {
    try {
      const response = await axios.post(

        `${baseUrl}/viewAllShareFoodProducts/${currentUser.userId}`,
      );
      const completedReservation = response.data.filter(order => order.status === 'Completed');
      setYourCompletedShareFood(completedReservation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      CompletedShareFood();
    }, []),
  );

  useEffect(() => {
    CompletedShareFood();
  }, []);

  const route = useRoute();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {yourCompletedSharedFood.length === 0 ? (
        <View style={[ContainerStyles.centerView]}>
          <Text>
            No food sharing has been completed yet.</Text>
        </View>
      ) : (
        <FlatList
          data={yourCompletedSharedFood}
          renderItem={({ item }) => {
            return (
              <SharedFoodCard
                navigation={navigation}
                item={item}
                currentOrderRoute={route.name}
              />
            );
          }}
        />
      )

      }

    </SafeAreaView>
  );
};
const ScheduleScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <TabScreensHeader navigation={navigation} title="Share Food" />
      <Tab.Navigator
        initialRouteName="MyFood"// Set the initial route based on categoryName
        screenOptions={TabBarStyles.customTabBar}>
        <Tab.Screen name="MyFood" component={MySharedFood} />
        <Tab.Screen name="SharedFood" component={SharedFood} />
        <Tab.Screen name="ConfirmedFood" component={ConfirmedShareFood} />
        <Tab.Screen name="Completed" component={CompletedShareFood} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
export default ScheduleScreen;
