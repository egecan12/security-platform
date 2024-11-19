import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  challenges: Record<string, { score: number; completed: boolean }>;
  totalScore: number;
}

const initialState: ProgressState = {
  challenges: {},
  totalScore: 0,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    updateChallengeScore: (
      state,
      action: PayloadAction<{ challengeId: string; score: number }>
    ) => {
      const { challengeId, score } = action.payload;

      if (!state.challenges[challengeId]) {
        state.challenges[challengeId] = { score: 0, completed: false };
      }

      state.challenges[challengeId].score = score;
      state.challenges[challengeId].completed = true;
      state.totalScore = Object.values(state.challenges).reduce(
        (sum, challenge) => sum + challenge.score,
        0
      );
    },
    resetProgress: (state) => {
      state.challenges = {};
      state.totalScore = 0;
    },
  },
});

export const { updateChallengeScore, resetProgress } = progressSlice.actions;

export default progressSlice.reducer;
