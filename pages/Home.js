import * as React from 'react';

import { Image, StyleSheet, View ,Text , TouchableOpacity} from 'react-native';
import shop from "../assets/shop.png"
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({navigation}) => {

  //function to navigate to aad item page
  const handleNav =() =>{
    console.log("img @home btn clicked")
    navigation.navigate("AddItem")
  }
 

  return (
    <View style={style.container}>
      <View  style={style.topcontainer}>

        <Text style={{height:"20px" , textAlign:"center" , fontSize:"40px" , fontWeight:"bold"}}>Shopping List App </Text>
      
        <Text style={{height:"10px" , textAlign:"center" , fontSize:"20px" , margin: 50 }}>A quick and easy way to keep your shopping list </Text>
        
        <View style={{flex:1 , alignItems: "center" , margin:"150px"}}>
          <TouchableOpacity onPress={handleNav}>
          <Image source={shop} style={{height:350 ,width:350 ,alignItems:"center" }}/> 
          </TouchableOpacity>
       
        </View>

      </View>


      </View>
  
   
  );
};

const style = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: "#fff",
    width: "100%"

  },
  topcontainer: {
    flex:1,
  }


})



export default Home;