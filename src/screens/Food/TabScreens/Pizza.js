import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import AppColors from '../../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ContainerStyles from '../../../assets/Styles/ContainerStyles';
import TextStyles from '../../../assets/Styles/TextStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PizzaCard from '../../../components/Cards/PizzaCard';


const Pizza = ({navigation,title},props) => {
  const [allPizzaCards,setAllPizzaCards]=useState([{
    uri:require('../../../assets/Images/pizza.jpg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/pizza6.jpg'),
    title:"Organic Chef",
    deliveryTime:"25 min"
  },
  {
    uri:require('../../../assets/Images/pizza3.jpeg'),
    title:"Cheese It",
    deliveryTime:"30 min"
  },
  {
    uri:require('../../../assets/Images/pizza8.webp'),
    title:"The AI Baik - Pizza's Factory",
    deliveryTime:"40 min"
  },
  {
    uri:require('../../../assets/Images/pizza5.jpeg'),
    title:"Chiken Cuisine",
    deliveryTime:"45 min"
  },
])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white,}}>
        <StatusBar backgroundColor={AppColors.white} barStyle="dark-content" />
  <FlatList data={allPizzaCards}
          renderItem={({item})=>{
              return <PizzaCard props={props} item={item}/>
          }}/>

    </SafeAreaView>
  );
};

export default Pizza;
