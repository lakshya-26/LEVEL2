// src/App.tsx
import React from 'react';
import './App.css';
import JobApplicationForm from './components/JobApplicationForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <JobApplicationForm />
    </div>
  );
};

export default App;
