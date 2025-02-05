// redux/slices/generalSlice.ts
import { PieceType } from "@/types/piece";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GeneralState = {
  recent_pieces: PieceType[];
};

const initialState: GeneralState = {
  recent_pieces: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    addPiece(state, action: PayloadAction<PieceType>) {
      if (
        state.recent_pieces.findIndex(
          (piece) => piece.id === action.payload.id
        ) === -1
      ) {
        state.recent_pieces.push(action.payload);
      } else {
        state.recent_pieces = state.recent_pieces.filter(
          (piece) => piece.id !== action.payload.id
        );
        state.recent_pieces.push(action.payload);
      }
    },
  },
});

export const { addPiece } = generalSlice.actions;
export default generalSlice.reducer;
