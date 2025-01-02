import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';


const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        :
        []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addPaste: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast("Paste created successfully")


        },
        updatePaste: (state, action) => {
            const paste = action.payload
            const index = state.pastes.findIndex((item) => item._id === paste.id);
            const findItem = state.pastes.find((item) => item.title === paste.id)
            if (!findItem) {
                state.pastes.push(paste)
                // state.pastes[index] = paste;
                toast("update successfully")
                localStorage.setItem("pastes", JSON.stringify(state.pastes));

            }
            else {
                toast.success("paste updated");
            }

        },
        resetPaste: (state, action) => {
            state.pastes = [];
            localStorage.removeItem("pastes")

        },
        removePaste: (state, action) => {
            const pasteId = action.payload;
            console.log(pasteId);
            const index = state.pastes.findIndex((item) => item._id === pasteId);
            if (index >= 0) {
                state.pastes.splice(index, 1)
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("paste deleted")
            }



        },
    },
})

// Action creators are generated for each case reducer function
export const { addPaste, updatePaste, resetPaste, removePaste } = pasteSlice.actions

export default pasteSlice.reducer