import { useState, useEffect } from "react";
import "./App.css";
import { PeopleList } from "./components/PersonList";
import { IPerson, Person } from "./components/Person";
import { people } from "./data/dummyData";
import { Pagination } from "@mui/material";

function App() {
  const peoplePerPage = 3;
  const initialNumberOfPages = Math.ceil(people.length / peoplePerPage);
  const [visiblePeople, setVisiblePeople] = useState<IPerson[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(initialNumberOfPages);
  // Pagination
  useEffect(() => {}, []);
  // Update visible on page change
  useEffect(() => {
    const firstIndex = (currentPage - 1) * peoplePerPage;
    const lastIndex = firstIndex + peoplePerPage;
    const ppl = people.slice(firstIndex, lastIndex);
    setVisiblePeople([...ppl]);
  }, [currentPage]);

  useEffect(() => {
    // console.log(visiblePeople);
  }, [visiblePeople]);
  return (
    <div className="App">
      <>
        <header className="App-header">
          <p> Pagination example</p>
        </header>
        {<PeopleList allThePeople={visiblePeople} />}
        <Pagination
          page={currentPage}
          hidden={numberOfPages === 0}
          onChange={(event, page) => {
            setCurrentPage(page);
          }}
          count={numberOfPages}
          color="primary"
        />
      </>
    </div>
  );
}

export default App;
