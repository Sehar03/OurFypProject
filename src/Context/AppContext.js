import React, {useState} from 'react';
const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [selectedFoodFeature, setSelectedFoodFeature] = useState([]);
  const [selectedSubCategoryFeature, setSelectedSubCategoryFoodFeature] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [isAddedIntoSchedule, setIsAddedIntoSchedule] = useState('');
  const [isAddedIntoCart, setIsAddedIntoCart] = useState('');
  const [mySchedule, setMySchedule] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [donatedData, setDonatedData] = useState([]);
  const [isAddedIntoDonatedData, setIsAddedIntoDonatedData] = useState('');
  const [selectedScreenForAddress, setSelectedScreenForAddress] = useState('');
  const [selectedDonationState, setSelectedDonationState] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [donorAddress,setDonorAddress]=useState('');
  const [baseUrl, setBaseUrl] = useState('http://192.168.1.14:8888');
  const [currentUser, setCurrentUser] = useState({});
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [restaurant_id, setRestaurantId] = useState(''); 
  const [restaurantName, setRestaurantName] = useState(''); 
 
  const storeUpdateCategoryName = (newCategoryName) => {
    setCategoryName(newCategoryName);
  };

  const storeSelectedFoodFeature = val => {
    setSelectedFoodFeature(val);
  };
  const storeSelectedSubCategoryFeature = val => {
    setSelectedSubCategoryFoodFeature(val);
  };
 
  const storeIsAddedIntoSchedule = val => {
    setIsAddedIntoSchedule(val);
  };
  const storeIsAddedIntoCart = val => {
    setIsAddedIntoCart(val);
  };
 
  const ScheduleEmpty = item => {
    setMySchedule([]);
  };
  const storeIsAddedIntoDonatedData = val => {
    setIsAddedIntoDonatedData(val);
  };
  
  const storeLoggedInUser = obj => {
    setLoggedInUser(obj);
  };
  

  const storeSelectedRestaurants = val => {
    setSelectedRestaurants(val);
  };
 
  const storeInSchedule = item => {
    setMySchedule(oldSchedule => [...oldSchedule, item]);
  };
  const storeInCart = item => {
    setMyCart(oldCart => [...oldCart, item]);
  };
 
  const storeInDonatedData = item => {
    setDonatedData(oldDonatedData => [...oldDonatedData, item]);
  };
  const updateCurrentUser = obj => {
    setCurrentUser(obj);
  };


  const storeSelectedImageUri = val => {
    setSelectedImageUri(val);
  };
  const storeSelectedScreenForAddress = val => {
    setSelectedScreenForAddress(val);
  };
  const storeSelectedDonationState = obj => {
    setSelectedDonationState(obj);
  };
  const storeDonorAddress=(val)=>{
setDonorAddress(val);
  };
  const storeRestaurantId = (val) => {
    setRestaurantId(val);
  };
  const storeRestaurantName = (val) => {
    setRestaurantName(val);
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
        selectedScreenForAddress,
        selectedDonationState,
        donorAddress,
        restaurant_id,
        restaurantName,
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
        storeSelectedScreenForAddress,
        storeSelectedDonationState,
        storeDonorAddress,
        storeSelectedScreenForAddress,
        storeSelectedDonationState,
        storeRestaurantId,
        storeRestaurantName
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
