import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../service/api';

const initialState = {
  meetings: [],
  currentMeeting: null,
  isLoading: false,
  error: null,
};

export const fetchMeetings = createAsyncThunk(
  'meeting/fetchMeetings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/jadwalruangan');
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch meetings');
    }
  }
);

export const createMeeting = createAsyncThunk(
  'meeting/createMeeting',
  async (meetingData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/meetings', meetingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create meeting');
    }
  }
);

export const fetchMeetingById = createAsyncThunk(
  'meeting/fetchMeetingById',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/meetings/${meetingId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch meeting');
    }
  }
);

export const updateMeeting = createAsyncThunk(
  'meeting/updateMeeting',
  async ({ meetingId, meetingData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/meetings/${meetingId}`, meetingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update meeting');
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  'meeting/deleteMeeting',
  async (meetingId, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/meetings/${meetingId}`);
      return meetingId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete meeting');
    }
  }
);

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentMeeting: (state, action) => {
      state.currentMeeting = action.payload;
    },
    clearCurrentMeeting: (state) => {
      state.currentMeeting = null;
    },
    addMeeting: (state, action) => {
      state.meetings = [...state.meetings, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetings = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

  },
});

export const { clearError, setCurrentMeeting, clearCurrentMeeting, addMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
