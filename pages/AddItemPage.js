// AddItemPage.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { addItemAction } from "../redux/actions";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";




const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (itemData) => dispatch(addItemAction(itemData)),
  };
};

function AddItemPage({ addItem , prop }) {

  const navigation = useNavigation();
  const [item, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const goToShop =()=>{
    console.log("go to shop btn clicked ")
  }

  const handleAddItem = () => {
    console.log("add btn clicked ")
    navigation.navigate("ShopingList");
    // Add validation logic if needed before adding the item
    
    addItem({
      Item: item,
      Price: itemPrice,
      Quantity: itemQuantity,
      Category: itemCategory,
    });

    setItemName("");
    setItemPrice("0");
    setItemQuantity("");
    setItemCategory("");

    alert("ITEM ADDED ");
  };

  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 10 }}>Add New Item</Text>
      
      <View>
        <Text>Item Name :</Text>
        <TextInput
          value={item}
          onChangeText={(text) => setItemName(text)}
        />
      </View>
      <View>
        <Text>Item Price :</Text>
        <TextInput
          value={itemPrice}
          onChangeText={(text) => setItemPrice(text)}
        />
      </View>
      <View>
        <Text>Item Quantity :</Text>
        <TextInput
          value={itemQuantity}
          onChangeText={(text) => setItemQuantity(text)}
        />
      </View>
   
  
     
      <TouchableOpacity title="Add Item" onPress={handleAddItem} style={{borderRadius:"15px" ,with:"20px",height: "40px",justifyContent:"center", alignItems:"center" , backgroundColor: "pink" ,  }}>
          <Text style={{textAlign:"center" , fontSize:"15px" ,fontWeight:"bold"}} >ADD ITEMS</Text>
      </TouchableOpacity>

      <View >
      <TouchableOpacity title="Add Item" onPress={goToShop} style={{borderRadius:"15px" ,with:"20px",height: "40px",justifyContent:"center", alignItems:"center" , backgroundColor: "orange" , marginTop:10 }}>
          <Text style={{textAlign:"center" , fontSize:"15px" ,fontWeight:"bold"}} >VIEW CART</Text>
      </TouchableOpacity>
      </View>
    </View>

  );
}

export default connect(null, mapDispatchToProps)(AddItemPage);
