import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchView from './components/SearchView'
import ResultsView from './components/ResultsView'
import NewSearchView from './components/NewSearchView'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Router>
            <div className="app">
                <Route exact path="/" component={NewSearchView}/>
                <Route path="/results/:tuid/:cityName/:checkInDate/:checkOutDate" component={ResultsView}/>
            </div>
        </Router>
    </MuiThemeProvider>
)
export default App
