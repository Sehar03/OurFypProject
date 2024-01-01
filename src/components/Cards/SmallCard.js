import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import AppContext from '../../Context/AppContext';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const SmallCard = ({ navigation }) => {
  const { storeSelectedSubCategoryFeature, baseUrl, storeUpdateCategoryName } = useContext(AppContext);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewAllCategories = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllCategories`);
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };

    viewAllCategories();
  }, [baseUrl]);

  return (
    <View>
      {loading ? (
       <View style={ { padding: 20,alignSelf:"center"}}>
       <LottieView
         source={require('../../assets/animations/Loading.json')}
         autoPlay
         loop
         style={{ width: 100, height: 100 }}
/>
     </View>
      ) : (
        <FlatList
          data={allCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              storeSelectedSubCategoryFeature('SubCategory');
              storeUpdateCategoryName({
                categoryName: item.title,
              });
              navigation.navigate('FurtherScreens', {
                categoryName: item.title,
              });
            }}>
              <Neomorph
                darkShadowColor="#A9B7C0"
                lightShadowColor="#F5F9FA"
                swapShadows
                style={ContainerStyles.smallCategoriesNeomorphStyle}
              >
                <Image source={{ uri: baseUrl + item.categoryImage }} style={{ height: hp('10'), width: wp('30'), marginTop: hp('2'), marginLeft: wp('0') }} />
              </Neomorph>
              <Text style={[TextStyles.smallText, { marginTop: 7 }]}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SmallCard;
