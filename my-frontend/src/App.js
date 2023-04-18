// import logo from './logo.svg';
import './App.css';
import DataLogForm from './components/DataLogForm'
import DataLogTable from './components/DataLogTable';


function App() {
  return (
    <div className='container'>
      <h1>DATALOG</h1>
      {/* <DataLogForm /> */}
      <DataLogTable 
      />
    </div>
  );
}

export default App;
