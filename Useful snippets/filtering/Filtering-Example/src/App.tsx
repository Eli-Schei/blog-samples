import { useState, useEffect } from "react";
import "./App.css";
import { PeopleList } from "./components/PersonList";
import { IPerson } from "./components/Person";
import { people } from "./data/dummyData";

function App() {

  const [filteredPeople, setFIlteredPeople] = useState<IPerson[]>(people);
  // FILTER EXAMPLE 
  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <>
        <header className="App-header">
          <p> Pagination example</p>
        </header>
        {<PeopleList allThePeople={filteredPeople} />}
       </>
    </div>
  );
}

export default App;
