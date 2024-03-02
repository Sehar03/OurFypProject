import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StatusBar, FlatList } from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RestaurantsCard from '../../components/Cards/RestaurantsCard';
import TabBarStyles from '../../assets/Styles/TabBarStyles';
import TabScreensHeader from '../../components/headers/TabScreensHeader';
import axios from 'axios';
import AppContext from '../../Context/AppContext';
import LottieView from 'lottie-react-native';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <View style={{}}>
          <LottieView
            source={require('../../assets/animations/Loading.json')}
            autoPlay
            loop
            speed={1.8}
            style={[ContainerStyles.LottieStyle]} />
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <LottieView
          source={require('../../assets/animations/Loading.json')}
          autoPlay
          loop
          speed={1.5}
          style={[ContainerStyles.LottieStyle]} />
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <LottieView
          source={require('../../assets/animations/Loading.json')}
          autoPlay
          loop
          speed={1.5}
          style={[ContainerStyles.LottieStyle]}
        />
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
const Biryani = ({ navigation, categoryName }) => {
  const [allBiryaniCards, setAllBiryaniCards] = useState([]);
  const { baseUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllBiryaniCards(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <LottieView
          source={require('../../assets/animations/Loading.json')}
          autoPlay
          loop
          speed={1.5}
          style={[ContainerStyles.LottieStyle]}
        />
      ) : (
        <FlatList
          data={allBiryaniCards.filter((restaurant) =>
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

// Chinese screen
const Chinese = ({ navigation, categoryName }) => {
  const { baseUrl } = useContext(AppContext);
  const [allChineseCards, setAllChineseCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllChineseCards(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <LottieView
          source={require('../../assets/animations/Loading.json')}
          autoPlay
          loop
          speed={1.5}
          style={[ContainerStyles.LottieStyle]}
        />
      ) : (
        <FlatList
          data={allChineseCards.filter((restaurant) =>
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
// Pasta screen
const Pasta = ({ navigation, categoryName }, props) => {
  const [allPastaCards, setAllPastaCards] = useState([])
  const { baseUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewAllRestaurants = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewAllRestaurants`);
        setAllPastaCards(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <LottieView
          source={require('../../assets/animations/Loading.json')}
          autoPlay
          loop
          speed={1.5}
          style={[ContainerStyles.LottieStyle]}
        />
      ) : (
        <FlatList
          data={allPastaCards.filter((restaurant) =>
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
   <TabScreensHeader item={`    ${categoryName}`} navigation={navigation} />
      <Tab.Navigator
        initialRouteName={categoryName}
        scrollEnabled={true}
        swipeEnabled={false}
        screenOptions={TabBarStyles.customTabBar}
      >
        <Tab.Screen
          name="Pizza"
          listeners={{
            tabPress: () => handleTabPress('Pizza'),
          }}
        >
          {(props) => <Pizza {...props} categoryName={categoryName} />}
        </Tab.Screen>
        <Tab.Screen
          name="Burger"
          listeners={{
            tabPress: () => handleTabPress('Burger'),
          }}
        >
          {(props) => <Burger {...props} categoryName={categoryName} />}
        </Tab.Screen>

        <Tab.Screen
          name="Shawarma"
          listeners={{
            tabPress: () => handleTabPress('Shawarma'),
          }}
        >
          {(props) => <Shawarma {...props} categoryName={categoryName} />}
        </Tab.Screen>
        <Tab.Screen
          name="Biryani"
          listeners={{
            tabPress: () => handleTabPress('Biryani'),
          }}
        >
          {(props) => <Biryani {...props} categoryName={categoryName} />}
        </Tab.Screen>
        <Tab.Screen
          name="Pasta"
          listeners={{
            tabPress: () => handleTabPress('Pasta'),
          }}
        >
          {(props) => <Pasta {...props} categoryName={categoryName} />}
        </Tab.Screen>
        <Tab.Screen
          name="Chinese"
          listeners={{
            tabPress: () => handleTabPress('Chinese'),
          }}
        >
          {(props) => <Chinese {...props} categoryName={categoryName} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FurtherScreens;
