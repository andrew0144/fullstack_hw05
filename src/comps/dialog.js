//imports
//react
import React from 'react';
//materials
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material';
//components
import DateTime from './dateTime';
import { compareAsc } from 'date-fns';
import { render } from '@testing-library/react';
//javascript
import moment from 'moment';

//master export
export default function ResponsiveDialog(props) {
    //variables
    let [deadline, setDeadline] = React.useState(props.dataFromParent.deadline);
    let [titleError, setTitleError] = React.useState(true);
    let [descriptionError, setDescriptionError] = React.useState(true);
    let [duplicateTitle, setDuplicateTitle] = React.useState(false);
    let [radioSelection, setRadioSelection] = React.useState("med");
    let isEdit = props.edit;

    //cancel
    let cancel = () => {
        props.parentCallback({
            action: 'cancel',
            data: { isEdit: isEdit }
        });
    };

    // adds a task to the page, using the parent callback
    let add = () => {
        if (checkDuplicateTitle()) {
            setDuplicateTitle(true);
            return;
        }
        if (titleError || descriptionError) return;
        props.parentCallback({
            action: 'submit',
            data: {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                deadline: deadline,
                priority: radioSelection,
                isComplete: false
            }
        });
    };

    // uses parent callback to edit the information stored in row
    let edit = () => {
        if (descriptionError) return;
        props.parentCallback({
            action: 'update',
            data: {
                description: document.getElementById("description").value,
                deadline: deadline,
                priority: radioSelection
            }
        });
    };

    // checks if the title textfield is a duplicate title
    let checkDuplicateTitle = () => {
        return props.parentCallback({
            action: 'checkDupTitle',
            data: { title: document.getElementById("title").value }
        });
    }

    // makes sure there aren't any empty fields in the dialog
    let validateEmpty = () => {
        let taskTitle = document.getElementById("title");
        let taskDescription = document.getElementById("description");
        if (isEdit === false && taskTitle.value === "") setTitleError(true);
        else setTitleError(false);
        if (taskDescription.value === "") setDescriptionError(true);
        else setDescriptionError(false);

        if (isEdit === false && checkDuplicateTitle()) {
            setTitleError(true);
            setDuplicateTitle(true);
        }

    }
    // updates the date when date picker is changed
    function updateDate(date) {
        setDeadline(moment(date).format('L'));
    }

    // changes state on radio button changes
    function radioChange(event) {
        let val = event.target.value;
        if (val === "medium") val = "med";
        setRadioSelection(val);
    }

    //return master object
    return (
        <>
            {/*title*/}
            <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
                {isEdit ?
                    <>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Task
                    </>
                    :
                    <>
                        <AddCircleIcon sx={{ verticalAlign: "-5px" }} /> Add Task
                    </>
                }
            </DialogTitle>
            {/*content*/}
            <DialogContent>
                {/*title*/}
                {// only show the title if the dialog is NOT an edit diaogue
                    isEdit ? '' :
                        <>
                            <br /><br />
                            <TextField onChange={validateEmpty} error={titleError} helperText={titleError ? duplicateTitle ? "Task title already exists!" : "Title is Required!" : ''} id="title" label="Title" variant="outlined" fullWidth />
                        </>
                }
                {/*description*/}
                <br /><br />
                <TextField onChange={validateEmpty} error={descriptionError} helperText={descriptionError ? "Description is Required!" : ''} id="description" label="Description" variant="outlined" fullWidth />

                {/*deadline*/}
                <br /><br />
                <DateTime dataFromParent={deadline} parentCallback={updateDate} />
                {/*priority*/}
                <br /><br />
                <FormControl>
                    <FormLabel id="priority-label">Priority</FormLabel>
                    <RadioGroup
                        id="priority"
                        row
                        aria-labelledby="priority-label"
                        defaultValue="medium"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel onChange={radioChange} value="low" control={<Radio />} label="Low" />
                        <FormControlLabel onChange={radioChange} value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel onChange={radioChange} value="high" control={<Radio />} label="High" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            {/*action buttons*/}
            <DialogActions sx={{ bgcolor: 'white' }}>
                {/*add button*/}
                <Button onClick={isEdit ? edit : add} variant="contained" color='primary' sx={{ width: 100 }}>
                    {isEdit ?
                        <>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                        </>
                        :
                        <>
                            <AddCircleIcon />&nbsp;Add
                        </>
                    }

                </Button>
                {/*cancel button*/}
                <Button onClick={cancel} variant="contained" color='error' sx={{ bgcolor: '#f44336', width: 100 }}>
                    <i className="fa fa-fw fa-lg fa-ban"></i>&nbsp;Cancel
                </Button>
            </DialogActions>
        </>
    );
}