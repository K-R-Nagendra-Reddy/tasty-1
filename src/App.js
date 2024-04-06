import {Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <>
    <Switch>
      <Header />
    </Switch>
  </>
)

export default App
