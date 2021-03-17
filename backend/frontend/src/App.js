import { Container } from 'react-bootstrap'
import { BrowserRouter as Router , Route } from 'react-router-dom'

import Footer from "./components/Footer"
import Header from './components/Header';
import DiscussionScreen from './Screens/DiscussionScreen'
import ReplyScreen from './Screens/ReplyScreen'
import CreateScreen from './Screens/CreateScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path="/" component={DiscussionScreen} exact/>
          <Route path="/reply/:id" component={ReplyScreen} />
          <Route path="/create" component={CreateScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
