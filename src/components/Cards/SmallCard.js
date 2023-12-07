import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import AppContext from '../../Context/AppContext';
import axios from 'axios';

const SmallCard = ({ navigation }) => {

  const { storeSelectedSubCategoryFeature,baseUrl } = useContext(AppContext);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    // Function to fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllCategories`);
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Call the function when the component mounts
    fetchCategories();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <FlatList
      data={allCategories}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
          storeSelectedSubCategoryFeature('SubCategory');
          navigation.navigate('FurtherScreens', { categoryName: item.title });
        }}>
          <Neomorph
            darkShadowColor="#A9B7C0"
            lightShadowColor="#F5F9FA"
            swapShadows
            style={ContainerStyles.smallCategoriesNeomorphStyle}
          >
            <Image source={{ uri: baseUrl+item.categoryImage }} style={{ height: hp('10'), width: wp('30'), marginTop: hp('2'), marginLeft: wp('0') }} />
          </Neomorph>
          <Text style={[TextStyles.smallText, { marginTop: 7 }]}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default SmallCard;
