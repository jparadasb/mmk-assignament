import {TypingTestProvider} from './context/typing-test.context';
import ConfigForm from './components/config-form';
import TypingTest from './components/typing-test';
import './App.css';


function App() {
  return (
    <TypingTestProvider>
      <ConfigForm />
      <TypingTest />
    </TypingTestProvider>
  );
}

export default App;
