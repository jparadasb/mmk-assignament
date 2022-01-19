import {TypingTestProvider} from './context/typing-test.context';
import ConfigForm from './components/config-form';
import TypingTest from './components/typing-test';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';


function App() {
  return (
    <TypingTestProvider>
      <ConfigForm />
      <TypingTest />
    </TypingTestProvider>
  );
}

export default App;
