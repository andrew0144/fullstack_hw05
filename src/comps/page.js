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
import CancelIcon from '@mui/icons-material/Cancel';
//components
import Dialog from './dialog';
//javascript
import moment from 'moment';
import toastr from 'toastr';
import { Checkbox } from "@mui/material";
//master export
export default class page extends Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            task: {
                title: "",
                description: "",
                deadline: moment().format('L')
            },
            rows: [],
            open: false,
            editOpen: false,
            editIndex: 0
        };
    }

    // opens the edit dialog to edit a row
    openEdit(index) {
        this.setState({ editOpen: true });
        this.setState({ editIndex: index });
    }

    // updates a row's information
    updateRow(data) {
        let copy = this.state.rows.slice();
        let index = this.state.editIndex;
        console.log(typeof data);
        data.title = copy[index].title;
        data.isComplete = copy[index].isComplete;
        copy.splice(index, 1, data);
        this.setState({ rows: copy });
        this.setState({ editOpen: false });
        toastr.success('Task updated successfully!', '', { 'closeButton': true, positionClass: 'toast-bottom-right' });
    }

    // deletes a row from rows in the state
    deleteRow(index) {
        let copy = this.state.rows.slice();
        copy.splice(index, 1);
        this.setState({ rows: copy });
        toastr.success('Task deleted successfully!', '', { 'closeButton': true, positionClass: 'toast-bottom-right' });
    }

    // add task button, opens the dialog functional component
    addTask() {
        this.setState({ open: true });
    }

    // submit task
    submitTask(data) {
        console.log(this.state.rows);
        this.setState((prevState) => ({ rows: prevState.rows.concat(data) }));
        this.setState({ open: false });
    };


    // checks for duplicate titles
    isDuplicateTitle(data) {
        let currTitle = data.title;
        let result = (this.state.rows.filter(row => row.title === currTitle).length > 0);
        return result;
    }

    // toggles a row's isComplete
    toggleIsComplete(index) {
        let copy = this.state.rows.slice();
        copy[index].isComplete = !copy[index].isComplete;
        this.setState({ rows: copy });
    }

    //callback from dialog input
    dialogCallback = (data) => {//functional syntax intentional
        if (data === null) return;
        if (data.action === 'submit') {//submitted
            this.submitTask(data.data); // don't send the action as well
            toastr.success('Task added successfully!', '', { 'closeButton': true, positionClass: 'toast-bottom-right' });
        }
        else if (data.action === 'update') {
            this.updateRow(data.data);
        }
        else if (data.action === 'cancel') {//cancelled
            if (data.data.isEdit === false) this.setState({ open: false });
            else this.setState({ editOpen: false });
        }
        else if (data.action === 'checkDupTitle') {
            return this.isDuplicateTitle(data.data);
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
                        dataFromParent={this.state.task}
                        edit={false}>
                    </Dialog>
                </DiaWrap>
                <DiaWrap
                    open={this.state.editOpen}
                    onClose={() => this.dialogCallback()}>
                    <Dialog
                        parentCallback={this.dialogCallback}
                        dataFromParent={this.state.rows[this.state.editIndex]}
                        edit={true}>
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
                                            <TableCell align="center">
                                                <Checkbox checked={row.isComplete ? true : false} onClick={() => this.toggleIsComplete(index)} />
                                            </TableCell>
                                            <TableCell align="center">
                                                {!row.isComplete ? <div><Button onClick={() => this.openEdit(index)} variant="contained" startIcon={<i className="fa fa-pencil-square-o" aria-hidden="true"></i>}>
                                                    UPDATE
                                                </Button></div> : <div></div>}
                                                <Button onClick={() => this.deleteRow(index)} variant="contained" color="error" startIcon={<CancelIcon />} sx={{ bgcolor: '#f44336' }}>
                                                    DELETE&nbsp;
                                                </Button>
                                            </TableCell>
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