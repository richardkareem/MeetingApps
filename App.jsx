import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store/index'
import Route from './app/route'
import { PaperProvider, Portal } from 'react-native-paper'
const App = () => {
  return (
   <Provider store={store}>
    <PaperProvider>
      <Portal>
        <Route />
      </Portal>
    </PaperProvider>
    
   </Provider>
  )
}
export default App
