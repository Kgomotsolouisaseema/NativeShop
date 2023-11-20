// ShoppingListPage.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,

} from "react-native";
import { connect } from "react-redux";
import { deleteItemAction, updateItemAction } from "../redux/actions";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItemAction(id)),
    updateItem: (id, updatedItem) =>
      dispatch(updateItemAction(id, updatedItem)),
  };
};

function ShoppingListPage({ props }) {
  const [updatedItem, setUpdatedItem] = useState("");
 
  //TRY TO UPDATE ALL FIELDS
  const [updatedItemName, setUpdatedItemName] = useState("");
  const [updatedItemPrice, setUpdatedItemPrice] = useState("");
  const [updatedItemQuantity, setUpdatedItemQuantity] = useState("");
  //state to show visibilty when update icon is clicked
  const [showInput, setshowInput] = useState(false);

  const [shopingItems, setShopingItems] = useState([]);

  

  const shopingCollectionRef = collection(db, "shopingitemsCollect");

  //function to delete items
  const deleteItems = async (id) => {
    const shopItems = doc(db, "shopingitemsCollect", id);

    await deleteDoc(shopItems);
    //dispatch
    props.deletItem(id);
    // deletItem(id);
  };

  //function to update items
  const updateItem = async (id) => {
    const shopItems = doc(db, "shopingitemsCollect", id);
    try{

    await updateDoc(shopItems, {
       Item: updatedItem 
    //for updating many fields 
    // Item : updatedItemName,
    // Price: updatedItemPrice,
    // Quantity: updatedItemQuantity,
  });

    console.log("Item updated successfully" , updatedItem)
    Alert.alert("Name update success")

    //dispatch
    props.updateItem(id, updatedItem);
    props.updateItem(id,{
    //for updating many fields 
    // Item : updatedItemName,
    // Price: updatedItemPrice,
    // Quantity: updatedItemQuantity,
    });
    

    }catch(error){
      console.log("Error updating item" , error)
    }
    
  };

  const getShopingItems = async () => {
    console.log(getShopingItems);
    // const  querySnapshot = await shopingCollectionRef.get();

    // querySnapshot.forEach((doc)=>{
    //   console.log("Document data:" , doc.data());
    // });
    //read data from database and set the shoping items
    try {
      const data = await getDocs(shopingCollectionRef);
      const filtereddata = data.docs.map((doc) => ({
        //this fucntion  returns the values in the collection of shoping list and displays it on the console.
        ...doc.data(),
        id: doc.id,
      }));
      setShopingItems(filtereddata);
      console.log(filtereddata);
    } catch (error) {
      console.error("Error fetching collection", error);
    }
  };

  useEffect(() => {
    getShopingItems();
  }, []);

  
 
 
  return (
    <View  style={style.container}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 10,
          textAlign: "center",
          margin: 5,
          marginBottom: 20,
        }}
      >
        Shopping List
      </Text>
      {shopingItems.map((item, index) => (
        <View key={item.id} style={{ marginBottom: 10, borderWidth: 1 }}>
          <Text style={{ fontSize: 18 }}>Item Name : {item.Item}</Text>
          <Text style={{ fontSize: 18 }}>Price: R {item.Price}</Text>
          <Text style={{ fontSize: 18 }}>Quantity : {item.Quantity}</Text>
          {/* CONDITIONALLY RENDER THE INOUT FIELDS BASED ON 'SHOWINPUT* STATE*/}
          {showInput &&(
          <View>
            <TextInput  style={{borderWidth:1 , }}
             placeholder="Update item"
             onChangeText={(text) => setUpdatedItem(text)}
           />
           <TextInput  style={{borderWidth:1 , }}
             placeholder="Update item"
             onChangeText={(text) => setUpdatedItem(text)}
           />
           <TextInput  style={{borderWidth:1 , }}
             placeholder="Update item"
             onChangeText={(text) => setUpdatedItem(text)}
           />

          </View>
             
           
           
          )}
        
             

          <View
            style={{
              position: "absolute",
              right: 0,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View>
              <TouchableOpacity
                title="Delete item"
                onPress={() => deleteItems(item.id)}
              >
                <AntDesign name="delete" size={34} color="black" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                title="Update Item"
                // onPress={() => updateItem(item.id)}
                onPress={()=> setshowInput(!showInput)}
              >
                <FontAwesome5 name="edit" size={34} color="black" />
              </TouchableOpacity>
            </View>
 
          </View>
        </View>

      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    
    backgroundColor: "white",
    width: "90%" , 
    margin: 20,
  },

})
export default connect(null, mapDispatchToProps)(ShoppingListPage);
