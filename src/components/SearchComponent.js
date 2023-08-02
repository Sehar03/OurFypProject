import React,{useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, Button, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppColors from '../assets/colors/AppColors';

import IconStyles from '../assets/Styles/IconStyles';
import { Neomorph } from 'react-native-neomorph-shadows';

import EvilIcons from 'react-native-vector-icons/EvilIcons';




const SearchComponent = ({navigation,item}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    // Function to update the search query state as the user types
    const handleSearchQuery = (text) => {
      setSearchQuery(text);
    };
  
    // Function to perform the search operation
    const performSearch = () => {
      // Implement your search logic here.
      // This is just a placeholder example that sets the search results to an array of strings.
      const results = ['piza', 'Result 2', 'Result 3', 'Result 4'];
  
      setSearchResults(results);
    };
  return (
    <View style={{backgroundColor:"white",borderBottomWidth:1,borderColor:AppColors.background}}>
  <View>
<Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={{
         width: wp('80%'),
          height: hp('7%'),
          borderRadius: wp('10%'),
          shadowRadius: 4,
          backgroundColor: AppColors.white,
          marginVertical: hp('1.4%'),
          shadowOpacity: 0.2,
          marginTop: hp('1.4%'),
          marginLeft:wp('10'),
          marginBottom:hp('3')
          }}>
          <View style={{flexDirection: 'row'}}>
            <EvilIcons
              name="search"
              size={wp('6%')}
              style={IconStyles.signupIcons}
            />
            <TextInput
              placeholder="Search for restaurant,food......"
              onChangeText={handleSearchQuery}
              value={searchQuery}
            />
          </View>
        </Neomorph>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  </View>
  )   
};

export default SearchComponent;
