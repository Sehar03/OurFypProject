import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppColors from '../../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ContainerStyles from '../../../assets/Styles/ContainerStyles';
import TextStyles from '../../../assets/Styles/TextStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PizzaCard from '../../../components/Cards/PizzaCard';
import BurgerCard from '../../../components/Cards/BurgerCard';
import PastaCard from '../../../components/Cards/PastaCard';


const Pasta = ({navigation},props) => {
  const [allPastaCards,setAllPastaCards]=useState([{
    uri:require('../../../assets/Images/pasta.jpg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/pasta1.jpg'),
    title:"Organic Chef",
    deliveryTime:"55 min"
  },
  {
    uri:require('../../../assets/Images/pasta4.jpeg'),
    title:"Cheese It",
    deliveryTime:"35 min"
  },
  {
    uri:require('../../../assets/Images/pasta3.jpeg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"40 min"
  },
  {
    uri:require('../../../assets/Images/pasta2.jpg'),
    title:"Chiken Cuisine",
    deliveryTime:"45 min"
  },
])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white,}}>
  <FlatList data={allPastaCards}
          renderItem={({item})=>{
              return <PastaCard props={props} item={item}/>
          }}/>

    </SafeAreaView>
  );
};

export default Pasta;
