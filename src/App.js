import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import SearchView from './components/SearchView'
import ResultsView from './components/ResultsView'

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={SearchView}/>
            <Route path="/results/:cityName/:checkInDate/:checkOutDate" component={ResultsView}/>
        </div>
    </Router>
)
export default App
