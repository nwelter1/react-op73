import { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@material-ui/data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle} from '@material-ui/core';
import { DroneForm } from '../../components/DroneForm';


const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200
  },
  {
    field: 'name',
    headerName: 'name',
    width: 150
  },
  {
    field: 'description',
    headerName: 'description',
    width: 150
  },
  {
    field: 'camera_quality',
    headerName: 'camera_quality',
    width: 200
  },
  {
    field: 'flight_time',
    headerName: 'flight_time',
    width: 150
  },
  {
    field: 'max_speed',
    headerName: 'max_speed',
    width: 150
  },
  {
    field: 'dimensions',
    headerName: 'dimensions',
    width: 150
  },
  {
    field: 'weight',
    headerName: 'weight',
    type: 'number',
    width: 200
  },
  {
    field: 'cost_of_prod',
    headerName: 'cost_of_prod',
    type: 'number',
    width: 210
  },
  {
    field: 'series',
    headerName: 'series',
    type: 'number',
    width: 210
  }
];
  
interface gridData{
  data:{
    id?:string;
  }
}

export const DataTable = () =>{
  let { droneData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<gridData>({data: {}})
  const [selectionModel, setSelectionModel] = useState<any>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = async () => {
    await server_calls.delete(selectionModel)
    getData()
    console.log('deleted selection!', selectionModel)
  }

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2> Drones in Inventory</h2>
          <DataGrid 
            rows={droneData} 
            columns={columns} 
            pageSize={5} 
            checkboxSelection 
            onSelectionModelChange ={ (item) => {
              setSelectionModel(item)
            }}
            {...droneData}
          />
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update a Drone</DialogTitle>
            <DialogContent>
              <DialogContentText>Drone id: {selectionModel}</DialogContentText>
              <DroneForm id={`${selectionModel}`} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button> 
              <Button onClick={handleClose} color="primary">Done</Button> 
            </DialogActions>
          </Dialog>
        </div>
    )
}