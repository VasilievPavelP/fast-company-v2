import React from 'react'
import Users from './layouts/users'
import Login from './layouts/login'
import Main from './layouts/main'
import NavBar from './components/ui/navBar'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/users/:userId?/:update?' component={Users} />
      </Switch>
    </div>
  )
}

export default App
