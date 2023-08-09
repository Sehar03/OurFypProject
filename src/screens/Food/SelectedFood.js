import React from 'react';
import { View, Text, Button } from 'react-native';

const SelectedFoodScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const handleFoodShare = () => {
    // Add code to handle food sharing, payment, etc.
    // For simplicity, we'll just display a success message here
    navigation.navigate('Menu');
    alert(`You shared ${item.name} with others!`);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Selected Food for Sharing</Text>
      <Text>Name: {item.name}</Text>
      <Text>Price: ${item.price}</Text>
      <Button title="Share Food" onPress={handleFoodShare} />
    </View>
  );
};

export default SelectedFoodScreen;
