//imports
//react
import React, { Component } from "react";
//materials
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DiaWrap from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
//components
import Dialog from './dialog';
//javascript
import moment from 'moment';
import toastr from 'toastr';
//master export
export default class page extends Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            task: {
                deadline: moment()
            },
            rows: [],
            open: false
        };
    }

    //add task
    addTask() {
        this.setState({ open: true });
    };

    //callback from dialog input
    dialogCallback = (data) => {//functional syntax intentional
        if (data.action === `submit`) {//submitted
            toastr.success(`Task added successfully!`, ``, { 'closeButton': true, positionClass: 'toast-bottom-right' });
        } else if (data.action === `cancel`) {//cancelled
            this.setState({ open: false });
        }
    }

    //render
    render() {
        return (
            <>
                <DiaWrap
                    open={this.state.open}
                    onClose={() => this.dialogCallback()}>
                    <Dialog
                        parentCallback={this.dialogCallback}
                        dataFromParent={this.state.task} >
                    </Dialog>
                </DiaWrap>
                {/*master card*/}
                <Card sx={{ margin: '20px' }}>
                    {/*card header*/}
                    <CardHeader sx={{ bgcolor: 'primary.dark', color: 'white' }}
                        title={<><small><i className='fa fa-fw fa-bars'></i>FRAMEWORKS</small></>}
                        style={{ textAlign: 'center' }}
                        action={
                            <>
                                {/*button*/}
                                <Button variant="contained" onClick={() => this.addTask()} sx={{ width: 100, marginRight: '7px' }}>
                                    <i className="fa fa-fw fa-plus-circle"></i>Add
                                </Button>
                            </>
                        } />
                    {/*card content*/}
                    <CardContent sx={{ bgcolor: 'white', marginBottom: -1 }}>
                        <TableContainer>
                            <Table sx={{ bgcolor: 'white' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: 0.1, color: 'gray' }}>Title</TableCell>
                                        <TableCell align="center" sx={{ width: 0.1, color: 'gray' }}>Description</TableCell>
                                        <TableCell align="center" sx={{ width: 0.1, color: 'gray' }}>Deadline</TableCell>
                                        <TableCell align="center" sx={{ width: 0.1, color: 'gray' }}>Priority</TableCell>
                                        <TableCell align="center" sx={{ width: 0.1, color: 'gray' }}>Is Complete</TableCell>
                                        <TableCell align="center" sx={{ width: 0.1, color: 'gray' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.map((row, index) => (
                                        <TableRow key={row.title}>
                                            <TableCell align='center'>{row.title}</TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">{row.deadline}</TableCell>
                                            <TableCell align="center">{row.priority}</TableCell>
                                            <TableCell align="center">X</TableCell>
                                            <TableCell align="center">X</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </>
        );
    }
}      