import React from 'react';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const data = [
  {
    id: '1',
    image: require('../../assets/Images/image5.png'),
    price: 'RS. 230.00' 
  },
  {
    id: '2',
    image: require('../../assets/Images/image7.png'),
    price: 'RS. 230.00' 
  },{
    id: '3',
    image: require('../../assets/Images/image8.png'),
    price: 'RS. 230.00' 
  },{
    id: '4',
    image: require('../../assets/Images/image10.png'),
    price: 'RS. 230.00' 
  },{
    id: '5',
    image: require('../../assets/Images/image14.png'),
    price: 'RS. 230.00' 
  },{
    id: '6',
    image: require('../../assets/Images/image4.jpg'),
    price: 'RS. 230.00' 
  },
  // Add more data objects for more cards...
];

const CardComponent = () => {
  
    const renderItem = ({ item }) => (
      <TouchableOpacity>
      <Card containerStyle={styles.cardContainer}>
        {/* Image */}
        <Image source={item.image} style={styles.cardImage} />
        <Text>{item.price}</Text>
      </Card>
      </TouchableOpacity>
    );
  
    return (
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
       showsHorizontalScrollIndicator={false}
      />
    );
  };
  
  const styles = StyleSheet.create({
    cardContainer: {
      width: 180, // Adjust card width as per your requirement
      borderRadius:15,
      elevation: 9,
      shadowColor: AppColors.background,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      marginTop:hp(3),
      marginRight:0,
      marginLeft:wp(2.5)
    },
    cardImage: {
      width: wp(41),
      height: hp(15), // Adjust image height as per your requirement
      borderRadius: 20,
    },
    flatListContainer: {
      paddingVertical: 10, // Add some padding at the top and bottom
    },
  });
  
  export default CardComponent;  