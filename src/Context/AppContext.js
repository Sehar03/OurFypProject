import React,{useState} from 'react'
const AppContext = React.createContext();

export const AppProvider =({children})=>{
     
    const[selectedFoodFeature,setSelectedFoodFeature]=useState([]);
    const[selectedSubCategoryFeature,setSelectedSubCategoryFoodFeature]=useState([]);
    const[selectedRestaurants,setSelectedRestaurants]=useState([]);
    const [isAddedIntoSchedule, setIsAddedIntoSchedule] = useState('');
    const [isAddedIntoCart, setIsAddedIntoCart] = useState('');
    const [mySchedule, setMySchedule] = useState([]);
    const [myCart, setMyCart] = useState([]);
    const [donatedData, setDonatedData] = useState([]);
    const [isAddedIntoDonatedData, setIsAddedIntoDonatedData] = useState('');
    const [loggedInUser,setLoggedInUser]=useState({});
    const[baseUrl,setBaseUrl]=useState("http://192.168.1.25:8888");
    const [currentUser,setCurrentUser] =useState({});
    const [selectedImageUri,setSelectedImageUri]=useState('');

    const storeSelectedFoodFeature= (val)=>{
        setSelectedFoodFeature(val);  
    }
    const storeSelectedSubCategoryFeature= (val)=>{
        setSelectedSubCategoryFoodFeature(val);  
    }
    const storeSelectedRestaurants= (val)=>{
        setSelectedRestaurants(val);  
    }
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

       // Load selectedImageUri from AsyncStorage on app startup
  // useEffect(() => {
  //   const loadSelectedImage = async () => {
  //     try {
  //       const storedImageUri = await AsyncStorage.getItem('selectedImageUri');
  //       if (storedImageUri) {
  //         setSelectedImageUri(storedImageUri);
  //       }
  //     } catch (error) {
  //       console.error('Error loading selected image from AsyncStorage:', error);
  //     }
  //   };

  //   loadSelectedImage();
  // }, []);

  // Update the state and AsyncStorage whenever selectedImageUri changes
  // useEffect(() => {
  //   const saveSelectedImage = async () => {
  //     try {
  //       await AsyncStorage.setItem('selectedImageUri', selectedImageUri);
  //     } catch (error) {
  //       console.error('Error saving selected image to AsyncStorage:', error);
  //     }
  //   };

  //   saveSelectedImage();
  // }, [selectedImageUri]);

       const storeSelectedImageUri=(val)=>{
setSelectedImageUri(val);
       }; 

   
  
    return <AppContext.Provider value={{
      baseUrl,
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
        storeSelectedImageUri



    }} >
        {children}
    </AppContext.Provider>
}

export default AppContext;

