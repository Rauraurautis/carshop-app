import React, { useState } from 'react'
import vehicleService from '../services/vehicles'
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'

export default function AddCar({ setVehicles, editingCar }) {
    const [car, setCar] = useState({ brand: "", model: "", color: "", fuel: "", year: "", price: "", url: "" })
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        const carDetails = editingCar.row.original;
        console.log(carDetails)
        setCar({brand: carDetails.brand, model: carDetails.model, color: carDetails.color, fuel: carDetails.fuel, year: carDetails.year, price: carDetails.price, url: carDetails._links.self.href})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editCar = () => {
        vehicleService.editOne(car.url, car).then(res => vehicleService.getAll().then(data => setVehicles(data)))
        setCar({ brand: "", model: "", color: "", fuel: "", year: "", price: "" })
        handleClose();
    }

    return (

        <div style={{margin: "0 50% 0% 50%", width: "200px", paddingBottom: "1rem"}}>
            <Button variant="contained" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Vehicle</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Brand"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Model"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Color"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Fuel"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Year"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={car.year}
                        onChange={(e) => setCar({ ...car, year: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={editCar}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
