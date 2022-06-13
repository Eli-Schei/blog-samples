import { Chip } from "@mui/material";

export interface IPerson {
  name: string;
  age: string;
  hobbies: string[];
}
export const Person: React.FC<IPerson> = ({ name, age, hobbies }) => {
  return (
    <li className="person">
      <div>Name: {name} </div>
      <div>Age: {age} </div>
      <div>
        Hobbies:{" "}
        {hobbies.map((hobby) => {
          return (
            <Chip
              label={hobby}
              variant="outlined"
              size="small"
              color="primary"
            />
          );
        })}{" "}
      </div>
    </li>
  );
};
