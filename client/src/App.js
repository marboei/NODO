import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {ProjectPage} from "./Pages/ProjectPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProjectsPage} from "./Pages/ProjectsPage";
import {HomePage} from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Toolbar from "./Components/Toolbar";


function App() {
   
    
    const theme = createTheme({
        palette: {
            background: {
                default: '#eaeaea'
            }
        },
        typography: {
            fontFamily: [
                'Fredoka',
                'sans-serif',
            ].join(','),
        },
    });
  return (
      
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <Toolbar/>
                  <Routes>
                      <Route path="/" element={<HomePage/>}/>
                      <Route path="/projects" element={<ProjectsPage/>}/>
                      <Route path="/projects/:projectId" element={<ProjectPage/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/register" element={<RegisterPage/>}/>
                  </Routes>
              </BrowserRouter>
          </ThemeProvider>
  );
}

export default App;
