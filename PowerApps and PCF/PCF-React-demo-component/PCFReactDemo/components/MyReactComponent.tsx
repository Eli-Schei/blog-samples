import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IMyReactComponentProps {
  appContext: ComponentFramework.Context<IInputs>;
}

const MyReactComponent: React.FC<IMyReactComponentProps> = ({ appContext }) => {
  const dataSet = appContext.parameters.sampleDataSet;
  const allRecords = dataSet.sortedRecordIds.map((record) => {
    return <label>{dataSet.records[record].getValue("cr933_name")}</label>;
  });

  return (
    <form>
      <label>Hello React in PCF!</label>
      {allRecords}
    </form>
  );
};

export default MyReactComponent;
