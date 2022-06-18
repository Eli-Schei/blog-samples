import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IMyReactComponentProps {
  appContext: ComponentFramework.Context<IInputs>;
}

const MyReactComponent: React.FC<IMyReactComponentProps> = ({ appContext }) => {
  const dataSet = appContext.parameters.sampleDataSet;
  const allRecords = dataSet.sortedRecordIds.map((record) => {
    return <div>{dataSet.records[record].getValue("value")}</div>;
  });

  return (
    <section>
      <h2>Hello, this is a React component</h2>
      <p>I like to render and sing! </p>
      <p>{allRecords}</p>
    </section>
  );
};

export default MyReactComponent;
