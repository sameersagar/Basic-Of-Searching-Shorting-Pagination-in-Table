import logo from './logo.svg';
import './App.css';

import Table from './ImplementSearchSortFilter&Pagination/Table.js';

function App() {
  return (
    <div>
     {/*  <h2>Sameer Sagar Project</h2> */}
     {/* <p>Implementation of Shorting, Searching, Filter and Pagination...</p> */}
      <br/>
      <Table/>
    </div>
  );
}

export default App;


/* --------> This is acommand for starting the db.json server <------- */
/*>>>> json-server --watch db.json --port 5000 <<<<*/