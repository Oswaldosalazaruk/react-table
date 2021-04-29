import {Component} from "react"
import Dashboard from './components/Dashboard';
import { DataProvider } from './context/ContextData'

class App extends Component {
  render() {
    return (
      <DataProvider>
        <Dashboard />
      </DataProvider>
    )
  }
}

export default App;
