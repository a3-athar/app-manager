import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { get } from "../common/httpClient";

const ApplicationCard = (props: any) => {
  const [showDialog, setShowDialog] = useState(true);
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    setShowDialog(true);
    get(`${props.type}/${props.applicationName}`)
      .then((response) => {
        setApplicationData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.applicationName]);

  const hideDialog = () => {
    setShowDialog(false);
    setApplicationData([]);
  };

  return (
    <>
      <Dialog
        header={props.applicationName}
        visible={showDialog}
        modal={true}
        onHide={hideDialog}
      >
        <DataTable value={applicationData}>
          <Column
            field="ConsumedQuantity"
            header="Consumed Quantity"
            sortable
          />
          <Column field="Cost" header="Cost" sortable />
          <Column field="Date" header="Date" sortable />
          <Column field="InstanceId" header="Instance ID" />
          <Column field="Location" header="Location" />
          <Column field="MeterCategory" header="Meter Category" />
          <Column field="ResourceLocation" header="Resource Location" />
          <Column field="ServiceName" header="Service Name" />
          <Column field="UnitOfMeasure" header="Unit of Measure" sortable />
        </DataTable>
      </Dialog>
    </>
  );
};

export default ApplicationCard;
