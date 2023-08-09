import React, { createContext, useContext, useReducer } from 'react';
import { act } from 'react-dom/test-utils';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    // Implement your reducer logic here
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        // case "UPDATE":
        //     let arr = [...state]
        //     arr.find((food, index) => {
        //         if (food.id === action.id) {
        //             console.log(food.qty, parseInt(action.qty), action.price + food.price)
        //             arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        //         }
        //         return arr
        //     })
        //     return arr
        // case "UPDATE":
        //     return state.map(food => {
        //         if (food.id === action.id) {
        //             return {
        //                 ...food,
        //                 qty: parseInt(action.qty) + food.qty,
        //                 price: action.price + food.price
        //             };
        //         }
        //         return food;
        //     });
        case 'UPDATE':
            let arr = [...state]
            // console.log(arr);
            arr.find((a, idx) => {
                // console.log(a, action);
                if (a.id === action.id) {
                    // console.log('updated', action, a);
                    arr[idx] = { ...a, qty: (parseInt(action.qty) + a.qty), price: (action.price + a.price) } // a is the array jo abhi tk cart m prda tha and action contains the updated object's details
                }
            })
            return arr

        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in reducer")
    }
};

export const CartProvider = ({ children }) => { // Fix 1: Destructure "children" from the props
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}; // Fix 3: Remove unnecessary parentheses for export

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext); // Fix 4: Use "useContext" to get the dispatch value
