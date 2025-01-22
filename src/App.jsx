import React from 'react';
import PassGen from "./components/PassGen";
import { PassGenDataProvider } from './components/PassGen/context/PassContext';

function App() {
  return (
    <PassGenDataProvider>
      <div className="app-container">
        <PassGen />
      </div>
    </PassGenDataProvider>
  );
}

export default App;
