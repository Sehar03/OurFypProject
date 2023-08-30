import React,{useState} from 'react'
const AppContext = React.createContext();

export const AppProvider =({children})=>{

    const[selectedFoodFeature,setSelectedFoodFeature]=useState([]);
    const[selectedSubCategoryFeature,setSelectedSubCategoryFoodFeature]=useState([]);
    const[selectedRestaurants,setSelectedRestaurants]=useState([]);
    const [isAddedIntoSchedule, setIsAddedIntoSchedule] = useState('');
    const [mySchedule, setMySchedule] = useState([]);

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
      const ScheduleEmpty = item => {
        setMySchedule([]);
      };     
    return <AppContext.Provider value={{
        selectedFoodFeature,
        selectedSubCategoryFeature,
        selectedRestaurants,
        mySchedule,
        isAddedIntoSchedule,
        storeSelectedSubCategoryFeature,
        storeSelectedFoodFeature,  
        storeSelectedRestaurants,
        storeIsAddedIntoSchedule,
        storeInSchedule,
        ScheduleEmpty,


    }} >
        {children}
    </AppContext.Provider>
}

export default AppContext;

