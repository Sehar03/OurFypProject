import React, {useState} from 'react';
const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [selectedFoodFeature, setSelectedFoodFeature] = useState([]);
  const [selectedSubCategoryFeature, setSelectedSubCategoryFoodFeature] =useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [isAddedIntoSchedule, setIsAddedIntoSchedule] = useState('');
  const [isAddedIntoCart, setIsAddedIntoCart] = useState('');
  const [mySchedule, setMySchedule] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [donatedData, setDonatedData] = useState([]);
  const [isAddedIntoDonatedData, setIsAddedIntoDonatedData] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [baseUrl] = useState('http://192.168.0.109:8888');
  const [currentUser, setCurrentUser] = useState({});
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const storeSelectedFoodFeature = val => {
    setSelectedFoodFeature(val);
  };
  const storeSelectedSubCategoryFeature = val => {
    setSelectedSubCategoryFoodFeature(val);
  };
  const storeSelectedRestaurants = val => {
    setSelectedRestaurants(val);
  };
  const storeIsAddedIntoSchedule = val => {
    setIsAddedIntoSchedule(val);
  };
  const storeInSchedule = item => {
    setMySchedule(oldSchedule => [...oldSchedule, item]);
  };
  const storeIsAddedIntoCart = val => {
    setIsAddedIntoCart(val);
  };
  const storeInCart = item => {
    setMyCart(oldCart => [...oldCart, item]);
  };
  const ScheduleEmpty = item => {
    setMySchedule([]);
  };
  const storeInDonatedData = item => {
    setDonatedData(oldDonatedData => [...oldDonatedData, item]);
  };
  const storeIsAddedIntoDonatedData = val => {
    setIsAddedIntoDonatedData(val);
  };
  const updateCurrentUser = obj => {
    setCurrentUser(obj);
  };
  const storeLoggedInUser = obj => {
    setLoggedInUser(obj);
  };

  const storeSelectedImageUri = val => {
    setSelectedImageUri(val);
  };
  const storeUpdateCategoryName = (newCategoryName) => {
    setCategoryName(newCategoryName);
  };
  return (
    <AppContext.Provider
      value={{
        baseUrl,
        categoryName,
        currentUser,
        loggedInUser,
        selectedFoodFeature,
        selectedSubCategoryFeature,
        selectedRestaurants,
        mySchedule,
        isAddedIntoSchedule,
        myCart,
        isAddedIntoCart,
        donatedData,
        isAddedIntoDonatedData,
        selectedImageUri,
        storeSelectedSubCategoryFeature,
        storeSelectedFoodFeature,
        storeSelectedRestaurants,
        storeIsAddedIntoSchedule,
        storeInSchedule,
        storeIsAddedIntoCart,
        storeInCart,
        ScheduleEmpty,
        storeInDonatedData,
        storeIsAddedIntoDonatedData,
        updateCurrentUser,
        storeLoggedInUser,
        storeSelectedImageUri,
        storeUpdateCategoryName,

      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
