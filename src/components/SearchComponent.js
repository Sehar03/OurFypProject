// SearchComponent.js
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Neomorph } from 'react-native-neomorph-shadows';
import IconStyles from '../assets/Styles/IconStyles';
import ContainerStyles from '../assets/Styles/ContainerStyles';
import AppColors from '../assets/colors/AppColors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={{ borderBottomWidth: 1, borderColor: AppColors.background }}>
      <View>
        <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          swapShadows
          style={[ContainerStyles.searchNeomorphStyle]}
        >
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <AntDesign
              name="search1"
              size={wp('6%')}
              style={IconStyles.signupIcons}
            />
            <TextInput
              placeholder="Search for restaurant, food..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </Neomorph>
      </View>
    </View>
  );
};

export default SearchComponent;
