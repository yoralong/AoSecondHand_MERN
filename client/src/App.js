import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import MessengerCustomerChat from 'react-messenger-customer-chat';


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
          <MessengerCustomerChat
          pageId="110672616981089"
          appId="638516363904741"/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;