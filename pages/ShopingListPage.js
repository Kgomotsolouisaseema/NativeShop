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
    updateItem: (id, updatedItem) =>dispatch(updateItemAction(id, updatedItem)),
  };
};

function ShoppingListPage({ props , updateItem }) {

 
  //TRY TO UPDATE ALL FIELDS
  const [updatedItemName, setUpdatedItemName] = useState("");
  const [updatedItemPrice, setUpdatedItemPrice] = useState("");
  const [updatedItemQuantity, setUpdatedItemQuantity] = useState("");

  //state to show visibilty when update icon is clicked
  // const [showInput, setshowInput] = useState(false);
  const [showInputMap , setShowInputMap] = useState({});//OPENS UP THE UPDATE FIELDS FOR THE SPECIFIC OBJECT

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
  const updateItems = async (id , ) => {
    const shopItems = doc(db, "shopingitemsCollect", id);
    try{

    await updateDoc(shopItems, {
    //for updating many fields 
    Item : updatedItemName,
    Price: updatedItemPrice,
    Quantity: updatedItemQuantity,
  });

    console.log("Item updated successfully" )
    Alert.alert("Name update success")

    //dispatch
    // props.updateItem(id, updatedItem);
    props.updateItem(id,{
    //for updating many fields 
    Item : updatedItemName,
    Price: updatedItemPrice,
    Quantity: updatedItemQuantity,
    });
    
    //RESET THE OBJECT
    setUpdatedItemName ("");
    setUpdatedItemPrice("");
    setUpdatedItemQuantity("");

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
          flex:1,
          padding:20,
          fontSize: 24,
          marginBottom: 20,
          textAlign: "center",
          margin: 5,
          marginBottom: 20,
        }}
      >
        Shopping List
      </Text>
      {shopingItems.map((item, index) => (
        <View key={item.id} style={style.card}>
          <Text style={{ fontSize: 18, fontSize:18 , marginBottom:5  }}>Item Name : {item.Item}</Text>
          <Text style={{ fontSize: 18, fontSize:18 , marginBottom:5  }}>Price: R {item.Price}</Text>
          <Text style={{ fontSize: 18, fontSize:18 , marginBottom:5  }}>Quantity : {item.Quantity}</Text>
          {/* CONDITIONALLY RENDER THE INPUT FIELDS BASED ON 'SHOWINPUT* STATE
          THESE INPUT FIELDS
          */}
          {showInputMap[item.id] &&(
          <View>
            <TextInput  
             style={style.inputField}
             placeholder="Update name"
             onChangeText={(text) => setUpdatedItemName(text)}
           />
           <TextInput  style={style.inputField}
             placeholder="Update price"
             onChangeText={(text) => setUpdatedItemPrice(text)}
           />
           <TextInput  style={style.inputField}
             placeholder="Update Qty"
             onChangeText={(text) => setUpdatedItemQuantity(text)}
           />
           <TouchableOpacity onPress={()=>updateItems(item.id)}  style={style.saveButton}>
            <Text style={style.buttonText}>SAVE</Text>
           </TouchableOpacity>

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
            <View style={style.buttonContainer}>
              <TouchableOpacity
                title="Delete item"
                onPress={() => deleteItems(item.id)}
              >
                <AntDesign name="delete" size={34} color="black" />
              </TouchableOpacity>
          

          
              <TouchableOpacity
                title="Update Item"
                // onPress={() => updateItem(item.id)}
                // onPress={()=> setshowInput(!showInput)}
                onPress={()=>setShowInputMap((prevState)=>({ //this onPress identifies the specific shop item chosen and when you click on the update icon , it only opens that icon
                  ...prevState,
                  [item.id]: !prevState[item.id],
                }))}

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
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    // alignItems:"center",
    width: "90%" , 
    margin: 20,
  },
    inputField:{
      borderWidth:1,
      borderColor:"black",
      borderRadius:5,
      padding: 8,
      marginBottom: 10,
    },
    saveButton: {
      backgroundColor: "blue",
      borderRadius:15,
      height:40,
      justifyContent:"center",
      alignItems:"center",
      marginTop:10,
    },
    buttonText:{
      textAlign:"center",
      fontSize:20,
      fontWeight:"bold",
      color:"#fff",

    },
    card: {
      backgroundColor: "white",
      borderRadius:10,
      padding:15,
      marginBottom:15,
      elevation: 3 , //for andriod shadow
      shadowColor: "blue",
      shadowOffset: {width:2 , height:3}, //define how much shadow we have according to the dimensions of the box
      shadowOpacity: 0.7,
      shadowRadius: 5,
    },
    buttonContainer:{
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,

    }


})
export default connect(null, mapDispatchToProps)(ShoppingListPage);
