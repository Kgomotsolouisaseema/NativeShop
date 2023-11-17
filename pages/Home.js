import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { useState  } from 'react';
import { Image, StyleSheet, View ,Text} from 'react-native';
import shop from "../assets/shop.png"
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({navigation}) => {

  //function to navigate to aad item page
  const handleNav =() =>{
    console.log("img @home btn clicked")
    navigation.navigate("AddItem")
  }
 

  return (
    <View style={style.container}>
      <View  style={style.topcontainer}>

        <Text style={{height:"10px" , textAlign:"center" , fontSize:"30px"}}>Shopping Application </Text>
        

        <View style={{flex:1 , alignItems: "center" , margin:"150px"}}>
          <TouchableOpacity onPress={handleNav}>
          <Image source={shop} style={{height:250 ,width:150 ,alignItems:"center" }}/> 
          </TouchableOpacity>
       
        </View>

      </View>


      </View>
  
   
  );
};

const style = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: "pink",
    width: "100%"

  },
  topcontainer: {
    flex:1,
  }


})



export default Home;