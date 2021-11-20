import React from 'react';
import './App.css';
// import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    // Redirect,
    Route
//     Link,
    // HashRouter
} from 'react-router-dom';

import NavBar from './components/navBar';
import Footer from './components/footer';
import Home from './components/home/home';

class App extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render() {
        return(
            <div className="app-container">
            <Router>
                <NavBar />
                <Home />
                <Routes>
                    <Route path='/' exact />
                    <Route exact path="/" element={<Home />} />
                </Routes>
                <Footer />
            </Router>               
            </div>
        )
    }
}

export default App;
