import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {ProjectPage} from "./Pages/ProjectPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProjectsPage} from "./Pages/ProjectsPage";
import {HomePage} from "./Pages/HomePage";


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
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<HomePage/>}/>
                      <Route path="/projects" element={<ProjectsPage/>}/>
                      <Route path="/projects/:projectId" element={<ProjectPage/>}/>
                  </Routes>
                      
              </BrowserRouter>
          </ThemeProvider>
      
      
  );
}

export default App;
