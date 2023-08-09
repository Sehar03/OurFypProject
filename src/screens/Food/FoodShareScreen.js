import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const FoodShareScreen = ({ navigation }) => {
  const [foodMenu, setFoodMenu] = useState([
    { id: '1', name: 'Pizza', price: 5 },
    { id: '2', name: 'Burger', price: 3 },
    { id: '3', name: 'Pasta', price: 4 },
    // Add more food items here
  ]);

  const handleFoodSelection = (item) => {
    navigation.navigate('SelectedFood', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleFoodSelection(item)}>
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Text>{item.name}</Text>
        <Text>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', paddingVertical: 10, fontSize: 18 }}>
        Menu for Sharing
      </Text>
      <FlatList
        data={foodMenu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FoodShareScreen;
