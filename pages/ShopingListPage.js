// ShoppingListPage.js

import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { deleteItemAction, updateItemAction } from "../redux/actions";
import { db } from "../firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItemAction(id)),
    updateItem: (id, updatedItem) => dispatch(updateItemAction(id, updatedItem)),
  };
};

function ShoppingListPage({props}) {

  const [updatedItem, setUpdatedItem] = useState("");
  const [shopingItems, setShopingItems] = useState([]);

  const  shopingCollectionRef = collection(db,"shopingitemsCollect")



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
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Shopping List</Text>
      {shopingItems.map((item, index) => (
        <View key={item.id} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>ITEM NAME : {item.Item}</Text>
          <Text style={{ fontSize: 18 }}>PRICE: R {item.Price}</Text>
          <Text style={{ fontSize: 18 }}>QUANTITY : {item.Quantity}</Text>
          
          {/* <Button  /> */}
          <TouchableOpacity title="Delete item" onPress={() => deleteItems(item.id)}>
            <Text>DELETE ITEM</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="new item..."
            onChangeText={(text) => setUpdatedItem(text)}
          />
          <Button title="Update Item" onPress={() => updateItem(item.id)} />
        </View>
      ))}
    </View>
  );
}

export default connect(null, mapDispatchToProps)(ShoppingListPage);
