import './App.css';
import {createTheme, GlobalStyles, ThemeProvider} from "@mui/material";
import {ProjectPage} from "./Pages/ProjectPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ViewPage} from "./Pages/ViewPage";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Toolbar from "./Components/Toolbar";


function App() {
   
    
    const theme = createTheme({
        palette: {
            primary: {
                light: '#DBE2EF',
                main: "#3F72AF",
                dark: "#112D4E",
            },
            background: {
                default: '#112D4E'
            }
        },
        typography: {
            fontFamily: [
                'Archivo',
                'sans-serif',
            ].join(','),
        },
    });
  return (
      
          <ThemeProvider theme={theme}>
              <GlobalStyles
                  styles={{
                      body: { backgroundColor: "#EEEDDE" },
                  }}
              />
              <BrowserRouter>
                  <Toolbar/>
                  <Routes>
                      <Route path="/" element={<ViewPage/>}/>
                      <Route path="/projects/:projectId" element={<ProjectPage/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/register" element={<RegisterPage/>}/>
                  </Routes>
              </BrowserRouter>
          </ThemeProvider>
  );
}

export default App;
