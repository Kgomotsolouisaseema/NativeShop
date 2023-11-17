const initalState = {
    shoppingItems :[],
};


const rootReducer = (state = initalState,action)=> {
    switch (action.type){
        case "ADD_ITEM":
            return{
                ...state,
                shoppingItems:[...state.shoppingItems ,action.payload],
            };
        case "DELETE_ITEM":
            return{
                ...state,
                shoppingItems: state.shoppingItems.filter(
                    (item)=>item.id !== action.payload),
            }
        case "UPDATE_ITEM" :
            const updatedItems =state.shoppingItems.map(item=>{
                if(item.id === action.payload.id){
                    return{
                        ...item, Item:action.payload.updatedItem,
                    };
                }
                return item;
            });
            return{
                ...state,shoppingItems:updatedItems,
            };
            default:
                return state;


    }

}

export default rootReducer;
