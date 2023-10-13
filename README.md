> 22 - Aug - 2023

- yarn create vite
- yarn add -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- yarn add react-router-dom
- yarn add react-redux
- yarn add @reduxjs/toolkit
- yarn add redux-logger
- yarn add -D @types/redux-logger
- yarn add firebase

```js
// vite.config.ts
server: {
    port: 3000,
}
```

```
1.
configureStore({
  reducer: {},
});

2.
createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {    },
    decrement: (state) => {    },
  },
});

3.
configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

```
// typescript type for read/write
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

- typescript type for read/write from store... (RootState & AppDispatch)
- typescript hook for read/write from store... (useAppDispatch & useAppSelector)
- custom logger

# Learning context:

- redux store
- reducer slice
- redux hooks for read/write
- middleware
- firebase auth
- RTK query - api calling system
- api query code splitting


* vs code sidebar file navigation indicator

```js
"workbench.tree.indent": 10,
    "workbench.tree.renderIndentGuides": "always",
    "workbench.colorCustomizations": {
        "tree.indentGuidesStroke": "#ff0000",
        "tree.inactiveIndentGuidesStroke": "#50beee"
    },
```