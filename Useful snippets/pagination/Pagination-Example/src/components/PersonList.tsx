import { IPerson, Person } from "./Person";

interface IPeopleList {
  allThePeople: Array<IPerson>;
}
export const PeopleList: React.FC<IPeopleList> = ({ allThePeople }) => {
  const people = allThePeople.map((person) => {
    return (
      <Person name={person.name} age={person.age} hobbies={person.hobbies} />
    );
  });
  return <ul className="peopleList">{people}</ul>;
};
