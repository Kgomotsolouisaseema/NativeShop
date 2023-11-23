// AddItemPage.js

import React, { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity, StyleSheet, Alert } from "react-native";
import { db } from "../firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";

//pop up alerts
import swal from "sweetalert"

import { connect } from 'react-redux';
import { addItemAction } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";




const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (itemData) => dispatch(addItemAction(itemData)),
  };
};

function AddItemPage(props) {

  const shopingCollectionRef = collection(db, "shopingitemsCollect");


  const navigation = useNavigation();
  const [item, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");

//View cart button to navigate to the shoppng list page 
  const viewCart =()=>{
    console.log("go to shop btn clicked ")
    navigation.navigate("ShopingList");
  }

 

  const handleAddItem = async () => {
  
  
    try {
      await addDoc(shopingCollectionRef, {
        Item: item,
        Price: itemPrice,
        Quantity: itemQuantity,
        // Category: itemCategory,
      });

        // Dispatch Redux action to add the item to the shopping list
        props.addItem({
          Item: item,
          Price: itemPrice,
          Quantity: itemQuantity,
          // Category: itemCategory,
        })
        Alert.alert("ITEM ADDED ");
        swal("ITEM ADDED TO YOUR SHOP LIST ")

         //clear the fields after entry 
      setItemName("");
      setItemPrice("");
      setItemQuantity('');
      setItemCategory("");

    } catch (error) {
      console.error("Errod adding items to firebase", error);
    }
  };


  return (
    <View style={{flex:1 , margin: 90 , width:"60%"}}>
      <Text style={{ fontSize: 30, marginBottom: 20 ,alignItems:"center"}}>Add New Item</Text>
      
      <View>
        <Text>Item Name :</Text>
        <TextInput
          value={item}
          onChangeText={(text) => setItemName(text)}
          style={style.inputField}
        />
      </View>
      <View>
        <Text>Item Price :</Text>
        <TextInput
          value={itemPrice}
          onChangeText={(text) => setItemPrice(text)}
          style={style.inputField}
        />
      </View>
      <View>
        <Text>Item Quantity :</Text>
        <TextInput
          value={itemQuantity}
          onChangeText={(text) => setItemQuantity(text)}
          style={style.inputField}
        />
      </View>

      <View style={{margin:20}}>
      <TouchableOpacity title="Add Item" onPress={handleAddItem} style={{borderRadius:"15px" ,height: "40px",justifyContent:"center", alignItems:"center" , backgroundColor: "blue" ,  }}>
          <Text style={{textAlign:"center" , fontSize:"20px" ,fontWeight:"bold" , color:"white"}} >ADD ITEMS</Text>
      </TouchableOpacity>

      <View >
      <TouchableOpacity title="Add Item" onPress={viewCart} style={{borderRadius:"15px",height: "40px",justifyContent:"center", alignItems:"center" , backgroundColor: "blue" , marginTop:10 }}>
          <Text style={{textAlign:"center" , fontSize:"20px" ,fontWeight:"bold" , color:"white"}} >VIEW CART</Text>
      </TouchableOpacity>

      </View>

        
      </View>
    </View>

  );
}
const style = StyleSheet.create({
  inputField:{
    borderWidth:1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
    marginBottom:10,
    elevation: 3,
    shadowColor: "blue",
    shadowOffset: {width:0 , height:5},
    shadowOpacity: 0.8,
    shadowRadius: 5,

  }
})

export default connect(null, mapDispatchToProps)(AddItemPage);
