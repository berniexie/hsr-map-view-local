import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchView from './components/SearchView'
import ResultsView from './components/ResultsView'
import NewSearchView from './components/NewSearchView'
import HistoryView from './components/HistoryView'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Router>
            <div className="app">
                <Route exact path="/" component={NewSearchView}/>
                <Route path="/results/:tuid/:cityName/:checkInDate/:checkOutDate/:similarUserSearch" component={ResultsView}/>
                <Route path="/history/:tuid" component={HistoryView}/>
            </div>
        </Router>
    </MuiThemeProvider>
)
export default App
