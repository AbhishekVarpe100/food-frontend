import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Alert } from '@mui/material';

function Fav() {
    const [data, setData] = useState([]);
    const [render, setRender] = useState(false);

    const getData = async () => {
        const res = await axios.get('https://food-backend-1-xjm3.onrender.com/get-fav', { params: { username: localStorage.getItem('username') } });
        setData(res.data);
    };

    const handleDelete = async (id) => {
        const res = await axios.delete('https://food-backend-1-xjm3.onrender.com/del-fav', { params: { id } });
        if (res.data) {
            setRender(prev => !prev);
        }
    };

    useEffect(() => {
        getData();
    }, [render]);

    return (
        <div className="container mx-auto p-4">
            <Typography variant="h5" align="center" color="primary" gutterBottom>
                <i>Favorite Items</i>
            </Typography>

            {data.length > 0 && (
                <Typography variant="body1" align="center" gutterBottom>
                    Total favorite items: {data.length}
                </Typography>
            )}

            {data.length > 0 ? (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Image</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Price</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item._id} hover>
                                    <TableCell>
                                        <img
                                            src={item.file}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price} Rs.</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Alert severity="warning" className="max-w-md mx-auto mt-4">
                    <Typography variant="body1"><strong>No favorite items found</strong></Typography>
                    <Typography variant="body2">
                        When you add favorite items, they will show here.
                    </Typography>
                </Alert>
            )}
        </div>
    );
}

export default Fav;
