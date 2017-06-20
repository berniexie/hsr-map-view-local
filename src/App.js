import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchView from './components/SearchView'
import ResultsView from './components/ResultsView'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Router>
            <div className="app">
                <Route exact path="/" component={SearchView}/>
                <Route path="/results/:cityName/:checkInDate/:checkOutDate" component={ResultsView}/>
            </div>
        </Router>
    </MuiThemeProvider>
)
export default App
