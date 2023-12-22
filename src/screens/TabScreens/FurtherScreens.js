import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StatusBar, FlatList } from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RestaurantsCard from '../../components/Cards/RestaurantsCard';
import TabBarStyles from '../../assets/Styles/TabBarStyles';
import TabScreensHeader from '../../components/headers/TabScreensHeader';
import axios from 'axios';
import AppContext from '../../Context/AppContext';
const Tab = createMaterialTopTabNavigator();

const Pizza = ({ navigation, categoryName }) => {
  const { baseUrl } = useContext(AppContext);
  const [allPizzaCards, setAllPizzaCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllPizzaCards(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Products:', error);
        setLoading(false);
      }
    };

    viewAllRestaurants();
  }, [baseUrl]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={allPizzaCards.filter((restaurant) =>
            restaurant.restaurantCategories.includes(categoryName)
          )}
          renderItem={({ item }) => {
            return <RestaurantsCard navigation={navigation} item={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

// BurgerScreen

const Burger = ({ navigation, categoryName }) => {
  const { baseUrl } = useContext(AppContext);
  const [allBurgerCards, setAllBurgerCards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllBurgerCards(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Products:', error);
        setLoading(false);
      }
    };

    viewAllRestaurants();
  }, [baseUrl]);
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={allBurgerCards.filter((restaurant) =>
            restaurant.restaurantCategories.includes(categoryName)
          )}
          renderItem={({ item }) => {
            return <RestaurantsCard navigation={navigation} item={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

// Shawarma screen

const Shawarma = ({ navigation, categoryName }, props) => {
  const { baseUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [allShawarmaCards, setAlShawarmaCards] = useState([]);

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAlShawarmaCards(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Products:', error);
        setLoading(false);
      }
    };

    viewAllRestaurants();
  }, [baseUrl]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={allShawarmaCards.filter((restaurant) =>
            restaurant.restaurantCategories.includes(categoryName)
          )}
          renderItem={({ item }) => {
            return <RestaurantsCard navigation={navigation} item={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

// Biryani screen
const Biryani = ({ navigation }, props) => {
  const [allBiryaniCards, setAllBiryaniCards] = useState([
    {
      uri: require('../../assets/Images/biryani6.jpeg'),
      title: 'Biryani King - Sialkoti Gate',
      deliveryTime: '45 min',
      category: "Biryani"

    },
    {
      uri: require('../../assets/Images/biryani2.jpeg'),
      title: 'Biryani King - Nikka Chowk',
      deliveryTime: '25 min',
      category: "Biryani"
    },
    {
      uri: require('../../assets/Images/biryani3.jpeg'),
      title: 'Biryani King - Sialkoti Gate',
      deliveryTime: '40 min',
      category: "Biryani"
    },
    {
      uri: require('../../assets/Images/biryani4.jpeg'),
      title: 'Biryani King - Sialkoti Gate',
      deliveryTime: '35 min',
      category: "Biryani"
    },
    {
      uri: require('../../assets/Images/biryani5.jpeg'),
      title: 'Biryani King - Sialkoti Gate',
      deliveryTime: '25 min',
      category: "Biryani"
    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <FlatList
        data={allBiryaniCards}
        renderItem={({ item }) => {
          return <RestaurantsCard navigation={navigation} item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

// Chinese screen
const Chinese = ({ navigation }, props) => {
  const [allChineseCards, setAllChineseCards] = useState([
    {
      uri: require('../../assets/Images/chinese.jpeg'),
      title: "Mama's Cooking Hub",
      deliveryTime: '35 min',
      category: "Chinese"
    },
    {
      uri: require('../../assets/Images/chinese2.jpeg'),
      title: 'Organic Chef',
      deliveryTime: '45 min',
      category: "Chinese"

    },
    {
      uri: require('../../assets/Images/chinese5.jpg'),
      title: 'Cheese It',
      deliveryTime: '25 min',
      category: "Chinese"

    },
    {
      uri: require('../../assets/Images/chinese3.jpeg'),
      title: "Mama's Cooking Hub",
      deliveryTime: '30 min',
      category: "Chinese"

    },
    {
      uri: require('../../assets/Images/chinese4.jpeg'),
      title: 'Chiken Cuisine',
      deliveryTime: '40 min',
      category: "Chinese"

    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <FlatList
        data={allChineseCards}
        renderItem={({ item }) => {
          return <RestaurantsCard navigation={navigation} item={item} />;
        }}
      />
    </SafeAreaView>
  );
};
// Pasta screen
const Pasta = ({ navigation }, props) => {
  const [allPastaCards, setAllPastaCards] = useState([
    {
      uri: require('../../assets/Images/pasta.jpg'),
      title: "Mama's Cooking Hub",
      deliveryTime: '45 min',
      category: "Pasta"

    },
    {
      uri: require('../../assets/Images/pasta1.jpg'),
      title: 'Organic Chef',
      deliveryTime: '55 min',
      category: "Pasta"

    },
    {
      uri: require('../../assets/Images/pasta4.jpeg'),
      title: 'Cheese It',
      deliveryTime: '35 min',
      category: "Pasta"

    },
    {
      uri: require('../../assets/Images/pasta3.jpeg'),
      title: "Mama's Cooking Hub",
      deliveryTime: '40 min',
      category: 'Pasta'
    },
    {
      uri: require('../../assets/Images/pasta2.jpg'),
      title: 'Chiken Cuisine',
      deliveryTime: '45 min',
      category: 'Pasta'

    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <FlatList
        data={allPastaCards}
        renderItem={({ item }) => {
          return <RestaurantsCard navigation={navigation} item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const FurtherScreens = ({ navigation, route }) => {
  const [categoryName, setCategoryName] = useState(route.params.categoryName);

  useEffect(() => {
    // Update the categoryName when the route params change
    if (route.params.categoryName !== categoryName) {
      setCategoryName(route.params.categoryName);
    }
  }, [route.params.categoryName]);

  const handleTabPress = (tabName) => {
    // Update the categoryName when switching tabs
    setCategoryName(tabName);
    navigation.navigate(tabName, { categoryName: tabName });
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <TabScreensHeader title={categoryName} navigation={navigation} />
      <Tab.Navigator
        initialRouteName={categoryName}
        screenOptions={TabBarStyles.customTabBar}
      >
        <Tab.Screen
          name="Pizza"
          component={(props) => <Pizza {...props} categoryName={categoryName} />}
          listeners={{
            tabPress: () => handleTabPress('Pizza'),
          }}
        />
        <Tab.Screen
          name="Burger"
          component={(props) => <Burger {...props} categoryName={categoryName} />}
          listeners={{
            tabPress: () => handleTabPress('Burger'),
          }}
        />
        <Tab.Screen name="Shawarma" component={(props) => <Shawarma {...props} categoryName={categoryName} />} />
        <Tab.Screen name="Biryani" component={Biryani} />
        <Tab.Screen name="Pasta" component={Pasta} />
        <Tab.Screen name="Chinese" component={Chinese} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FurtherScreens;
