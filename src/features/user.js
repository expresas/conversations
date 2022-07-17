import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice ({
    name: "user",
    initialState: {
        value: {
            // users: [],
            // initial users
            users: [
                {admin: true, username: 'Jonas', password: 'sddsU_2', image: 'https://www.basketnews.lt/paveikslelis-331580-vbg.jpg', chats: [], banned: []},
                {admin: false, username: 'Petras', password: 'sddsU_2', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Petras_Vilei%C5%A1is_%281851-1926%29.jpg', chats: [], banned: []},
                {admin: false, username: 'Lukas', password: 'sddsU_2', image: 'https://lewben.com/wp-content/uploads/2020/09/Lukas_Kisielis.jpg', chats: [], banned: []},
                {admin: false, username: 'Janina', password: 'sddsU_2', image: 'https://www.printprint.lt/wp-content/uploads/2019/05/33039-jonines-as-janina-siandien-mano-diena-marskineliai-1.jpg', chats: [], banned: []},
                {admin: true, username: 'Žygimantas', password: 'sddsU_2', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cranach_the_Younger_Sigismund_II_Augustus.jpg/800px-Cranach_the_Younger_Sigismund_II_Augustus.jpg', chats: [], banned: []},
                ],
            userLoggedIn: '',
        }
    },
    reducers: {
        createUser: (state, action) => {
            state.value.users.push(action.payload)
        },
        updateUser: (state, action) => {
            state.value.users[action.payload.index] = action.payload.newData
            if (action.payload.newData.username === state.value.userLoggedIn.username) {
                state.value.userLoggedIn = action.payload.newData
            }
        },
        deleteUser: (state, action) => {
            state.value.users.splice(action.payload, 1)
        },
        setLoggedUser: (state, action) => {
            state.value.userLoggedIn = action.payload
        },
        setNewImage: (state, action) => {
            state.value.userLoggedIn.image = action.payload
        },
    }
})

export const {createUser, setLoggedUser, setNewImage, updateUser, deleteUser} = userSlice.actions
export default userSlice.reducer