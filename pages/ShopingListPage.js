// ShoppingListPage.js

import React, { useEffect, useState } from "react";
import { View, Text,  TextInput, TouchableOpacity, Pressable } from "react-native";
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
  const [shopingItems, setShopingItems] = useState([]);
  
  

  const [showInput, setshowInput] = useState(false);

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
    await updateDoc(shopItems, { Item: updatedItem });

    //dispatch
    props.updateItem(id, updatedItem);
    // updateItem(id, updatedItem);
  };

  const getShopingItems = async () => {
    console.log(getShopingItems)
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

  //show input form
  const show = () => {
    console.log("show form btn")(!showInput);
  };
  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 , textAlign:"center" , margin:5 , marginBottom: 20 }}>Shopping List</Text>
      {shopingItems.map((item, index) => (
        <View key={item.id} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>ITEM NAME : {item.Item}</Text>
          <Text style={{ fontSize: 18 }}>PRICE: R {item.Price}</Text>
          <Text style={{ fontSize: 18 }}>QUANTITY : {item.Quantity}</Text>

          <View style={{ position: "absolute", right: 0 }}>
            <TouchableOpacity
              title="Delete item"
              onPress={() => deleteItems(item.id)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              title="Update Item"
              onPress={() => updateItem(item.id)}
            >
              <FontAwesome5 name="edit" size={24} color="black" />
            </TouchableOpacity>
            
            {/* <Pressable title="Show input" onPress={()=> setshowInput(!setshowInput)}/> */}
            {setshowInput && (
              <TextInput
                placeholder="new item..."
                onChangeText={(text) => setUpdatedItem(text)}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

export default connect(null, mapDispatchToProps)(ShoppingListPage);
