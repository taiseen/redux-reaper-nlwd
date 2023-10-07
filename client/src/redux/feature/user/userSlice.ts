import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type TCredential = {
    email: string,
    password: string,
}

type TUser = {
    user: {
        email: string | null,
    };
    isLoading: boolean;
    isError: boolean;
    error: string | null;
};

const initialState: TUser = {
    user: {
        email: null
    },
    isLoading: false,
    isError: false,
    error: null
};

// need 2 things - 1) prefix & 2) function that return a promise
export const createUser = createAsyncThunk(
    'user/createUser',
    async ({ email, password }: TCredential) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);

        return data.user.email; // must return this statement, 
        // otherwise we can't get data inside redux...
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }: TCredential) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    }
);

const userSlice = createSlice({
    name: 'user',

    initialState,

    reducers: { // sync task...

        // for login data persistency
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user.email = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

    },

    extraReducers: (builder) => { // async task...

        // we get 3 case for every async function...
        builder

            // for user creating...
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user.email = action.payload; // data set/come from line number [34] at return statement
                state.isLoading = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.user.email = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!; // non-null assertion operator use here
            })

            // ###############################################################################
            // ###############################################################################
            // ###############################################################################

            // for user login...
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.email = action.payload; // data set/come from line number [34] at return statement
                state.isLoading = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user.email = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!; // non-null assertion operator use here
            })
    }
});

const { reducer, actions } = userSlice;

export const { setUser, setLoading } = actions;

export default reducer;
