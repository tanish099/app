import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addTOPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",
        JSON.stringify(state.pastes))
      toast.success("paste Created successfully",{position: "top-left"})
    },
    upadateFromPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
      }
      toast.success("paste updated",{position: "top-left"})
    },
    removeAllpaste: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);

      const index = state.pastes.findIndex((item) => item._id === pasteId)


      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste deletes",{position: "top-left"})
      }
    },
    resetPaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes")

    },
  },
})

// Action creators are generated for each case reducer function
export const { addTOPaste, upadateFromPaste, removeAllpaste, resetPaste } = pasteSlice.actions

export default pasteSlice.reducer