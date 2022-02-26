import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Column} from "./Components/Column";
import {createTheme, ThemeProvider} from "@mui/material";
import {ProjectPage} from "./Pages/ProjectPage";


function App() {
   
    
    const theme = createTheme({
        palette: {
            background: {
                default: '#eaeaea'
            }
        }
    });
  return (
      <ThemeProvider theme={theme}>
        <div className="App">
            <h1>NoDo</h1>
            <ProjectPage/>
        </div>
      </ThemeProvider>
  );
}

export default App;
