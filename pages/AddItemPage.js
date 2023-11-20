// AddItemPage.js

import React, { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity } from "react-native";
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

function AddItemPage({props}) {

  const shopingCollectionRef = collection(db, "shopingitemsCollect");


  const navigation = useNavigation();
  const [item, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const goToShop =()=>{
    console.log("go to shop btn clicked ")
    navigation.navigate("ShopingList");
  }

 

  const handleAddItem = async () => {
  
  
    try {
      await addDoc(shopingCollectionRef, {
        Item: item,
        Price: itemPrice,
        Quantity: itemQuantity,
        Category: itemCategory,
      });

        // Dispatch Redux action to add the item to the shopping list
        props.addItem({
          Item: item,
          Price: itemPrice,
          Quantity: itemQuantity,
          Category: itemCategory,
        })
      setItemName("");
      setItemPrice(0);
      setItemQuantity(0);
      setItemCategory("");

      alert("ITEM ADDED ");
    } catch (error) {
      console.error("Errod adding items to firebase", error);
    }
  };


  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 10 }}>Add New Item</Text>
      
      <View>
        <Text>Item Name :</Text>
        <TextInput
          value={item}
          onChangeText={(text) => setItemName(text)}
          style={{borderWidth:1 , }}
        />
      </View>
      <View>
        <Text>Item Price :</Text>
        <TextInput
          value={itemPrice}
          onChangeText={(text) => setItemPrice(text)}
          style={{borderWidth:1 , }}
        />
      </View>
      <View>
        <Text>Item Quantity :</Text>
        <TextInput
          value={itemQuantity}
          onChangeText={(text) => setItemQuantity(text)}
          style={{borderWidth:1 , }}
        />
      </View>
   
  
     
      <TouchableOpacity title="Add Item" onPress={handleAddItem} style={{borderRadius:"15px" ,with:"20px",height: "40px",justifyContent:"center", alignItems:"center" , backgroundColor: "blue" ,  }}>
          <Text style={{textAlign:"center" , fontSize:"15px" ,fontWeight:"bold"}} >ADD ITEMS</Text>
      </TouchableOpacity>

      <View >
      <TouchableOpacity title="Add Item" onPress={goToShop} style={{borderRadius:"15px" ,with:"20px",height: "40px",justifyContent:"center", alignItems:"center" , backgroundColor: "blue" , marginTop:10 }}>
          <Text style={{textAlign:"center" , fontSize:"15px" ,fontWeight:"bold"}} >VIEW CART</Text>
      </TouchableOpacity>
      </View>
    </View>

  );
}

export default connect(null, mapDispatchToProps)(AddItemPage);
