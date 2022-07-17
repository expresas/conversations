import {createSlice} from "@reduxjs/toolkit";

export const chatSlice = createSlice ({
    name: "chat",
    initialState: {
        value: {            
            chats: [],
        }
    },
    reducers: {
        createChat: (state, action) => {
            state.value.chats.push(action.payload)
        },
        updateChat: (state, action) => {
            state.value.chats = action.payload
        },
        deleteChat: (state, action) => {
            state.value.chats.splice(action.payload, 1)
        },
    }
})

export const {createChat, updateChat, deleteChat} = chatSlice.actions
export default chatSlice.reducer