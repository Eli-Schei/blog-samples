import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IMyReactComponentProps {
  appContext: ComponentFramework.Context<IInputs>;
}

const MyReactComponent: React.FC<IMyReactComponentProps> = ({ appContext }) => {
  const dataSet = appContext.parameters.sampleDataSet;
  const allRecords = dataSet.sortedRecordIds.map((record) => {
    return <div>{dataSet.records[record].getValue("cr933_name")}</div>;
  });

  return (
    <section>
      <h2>Hello datasource</h2>
      {allRecords}
    </section>
  );
};

export default MyReactComponent;
