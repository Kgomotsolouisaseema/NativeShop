import { createStore, applyMiddleware } from "redux";
import { db } from "../firebase";
import thunk from "redux-thunk";
import { deleteDoc, doc } from "firebase/firestore";


const initalState = {
  shoppingItems: [],
};



const rootReducer = (state = initalState, action , dispatch) => {
  
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        shoppingItems: [...state.shoppingItems, action.payload],
      };

    case "DELETE_ITEM":
      (async (dispatch) => {
        try {
          const itemId = action.payload;
          const shopItems = doc(db, "shopingitemsCollect", itemId);
          await deleteDoc(shopItems);
          dispatch({
            type: "DELETE_ITEM",
            payload: itemId,
        });
        } catch (error) {
          console.error("Error deleting item from Firebase:", error);
        }
      })(dispatch);

      return {
        ...state,
        shoppingItems: state.shoppingItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "UPDATE_ITEM":
      const updatedItems = state.shoppingItems.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            Item: action.payload.updatedItem,
          };
        }
        return item;
      });
      return {
        ...state,
        shoppingItems: updatedItems,
      };
    default:
      return state;
  }
};
const store = createStore(rootReducer, applyMiddleware(thunk));
export default rootReducer;
