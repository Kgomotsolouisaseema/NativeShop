export const addItemAction = (itemData) => {
    return {
        type : "ADD_ITEM" , 
        payload: itemData , 
    };
};

export const deleteItemAction = (id) => {
    return {
        type :"DELETE_ITEM",
        payload :id,
    };
};

export const updateItemAction = (id, updatedItem) => {
    return{
        type:"UPDATE_ITEM",
        payload : {id , updatedItem} ,
    };
};
