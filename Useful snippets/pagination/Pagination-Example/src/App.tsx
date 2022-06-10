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
  // PAGINATION EXAMPLE 
  // Use effect that is listening to changes in the currently selected page
  useEffect(() => {
     // Based on what page is currently selected get the first and last indexes of the 
     // objects that are going to be displayed in this page.
    const firstIndex = (currentPage - 1) * peoplePerPage;
    const lastIndex = firstIndex + peoplePerPage;
    // Use the indexes to perform a slice on the array with all objects
    const ppl = people.slice(firstIndex, lastIndex);
    // Update the state with the array of people that are going to be displayed
    setVisiblePeople([...ppl]);
  }, [currentPage]);

  return (
    <div className="App">
      <>
        <header className="App-header">
          <p> Pagination example</p>
        </header>
        {/* Get list of people by sending the array of people to be displayed into the component */}
        {<PeopleList allThePeople={visiblePeople} />}
        {/* Pagination component that is hidden if there are fewer than peoplePerPage in the array */}
        <Pagination
          page={currentPage}
          hidden={numberOfPages === 0}
          onChange={(event, page) => {
            // On change that gets the value of the page that was selected. 
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
