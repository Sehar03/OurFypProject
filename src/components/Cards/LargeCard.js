import React, { useState } from 'react';
import { FlatList} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RestaurantsCard from './RestaurantsCard';

const LargeCard= ({navigation},props) => {
const[allResturantsCards,setAllResturantsCards]=useState([
  {
 
    uri: require('../../assets/Images/image32.jpg'),
    width: wp(90),
    height: hp(30),
    title:"Baba Freed Burger Point" ,
    rupees:"Rs.49.00"
    },
  {

    uri: require('../../assets/Images/image23.png'),
    width: wp(90),
    height: hp(30),
    title:"Naveed Tikka Shop",
    rupees:"Rs.49.00"
  },{

    uri: require('../../assets/Images/image22.png'),
    width: wp(90),
    height: hp(30),
    title:"Ghar ka khana",
    rupees:"Rs.49.00"
  },{
 
    uri: require('../../assets/Images/image33.jpg'),
    width: wp(90),
    height: hp(30),
    title:"Domino's Pizza",
    rupees:"Rs.49.00"
  },{

    uri: require('../../assets/Images/image24.png'),
    width: wp(90),
    height: hp(30),
    title:"Banjoosa Pizza & Fast Food",
    rupees:"Rs.49.00"
  },{

    uri: require('../../assets/Images/image24.png'),
    width: wp(90),
    height: hp(30),
    title:"The AI Baik",
    rupees:"Rs.49.00"
  },{
    uri: require('../../assets/Images/image24.png'),
    width: wp(90),
    height: hp(30),
    title:"The AI Baik",
    rupees:"Rs.49.00"
  },
])
  return (
    <FlatList
      data={allResturantsCards}
      Vertical
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        return <RestaurantsCard navigation={navigation} item={item}/>
    }}  />
  );
};
export default LargeCard;
