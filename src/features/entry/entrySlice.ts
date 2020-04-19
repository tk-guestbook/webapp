import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';


export type Entry = {
    name: string;
    message: string;
    created_at: string;
}

interface EntryState {
    entries: Entry[];
    loading: {
        add: boolean;
        retrieve: boolean;
    };
    errors: {
        add: Error | null;
        retrieve: Error | null;
    };
    formSubmitted: boolean;
}

const initialState: EntryState = {
    entries: [],
    loading: {
        add: false,
        retrieve: false
    },
    errors: {
        add: null,
        retrieve: null
    },
    formSubmitted: false
};

export const addEntryAsync = createAsyncThunk(
    'entry/add',
    async (entry: Partial<Entry>) => {
        const response = await axios.post<Entry>(`${process.env.REACT_APP_API_URL}/entries`, entry);
        return response.data;
    }
);

export const retrieveEntriesAsync = createAsyncThunk(
    'entry/retrieve',
    async () => {
        const response = await axios.get<Entry[]>(`${process.env.REACT_APP_API_URL}/entries`);
        return response.data;
    }
);

export const entrySlice = createSlice({
    name: 'entry',
    initialState,
    reducers: {
        addEntryResetForm: state => {
            state.formSubmitted = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(addEntryAsync.pending, state => {
            state.loading.add = true;
            state.formSubmitted = false;
        });

        builder.addCase(addEntryAsync.fulfilled, (state, action: PayloadAction<Entry>) => {
            state.entries.splice(0, 0, action.payload);
            state.loading.add = false;
            state.formSubmitted = true;
        });

        builder.addCase(addEntryAsync.rejected, state => {
            state.errors.add = new Error("Failed to add entry!");
            state.loading.add = false;
        });

        builder.addCase(retrieveEntriesAsync.pending, state => {
            state.loading.retrieve = true;
        });

        builder.addCase(retrieveEntriesAsync.fulfilled, (state, action: PayloadAction<Entry[]>) => {
            state.entries = action.payload;
            state.loading.retrieve = false;
        });

        builder.addCase(retrieveEntriesAsync.rejected, state => {
            state.errors.retrieve = new Error("Failed to retrieve entries!");
            state.loading.retrieve = false;
        });
    },
});

export const { addEntryResetForm } = entrySlice.actions;

export default entrySlice.reducer;
