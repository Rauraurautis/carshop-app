import React, { useState, useEffect } from "react";
import vehicleService from "./services/vehicles.js"
import AddCar from "./components/AddCar.js";
import BasicTable from "./components/BasicTable.js";
import { CSVLink } from "react-csv"
import { AppBar, Toolbar, Typography } from '@mui/material'





function App() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    vehicleService.getAll().then(data => setVehicles(data))
  console.log("s")
  }, [])



  const headers = [
    { label: "Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Color", key: "color" },
    { label: "Fuel", key: "fuel" },
    { label: "Year", key: "year" },
    { label: "Price", key: "price" }
  ];

  const csvReport = {
    filename: "Vehicles.csv",
    headers: headers,
    data: vehicles
  }



  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carshop Application
          </Typography>
        </Toolbar>
      </AppBar>
      <CSVLink {...csvReport}>Export to CSV</CSVLink>
      <AddCar setVehicles={setVehicles} vehicles={vehicles} />
      <BasicTable vehicles={vehicles} setVehicles={setVehicles} />
    </div>
  );
}

export default App;
