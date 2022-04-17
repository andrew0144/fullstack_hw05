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

//master export
export default function ResponsiveDialog(props) {
    //variables
    let [deadline] = React.useState(props.dataFromParent.deadline);
    let [titleError, setTitleError] = React.useState(true);
    let [descriptionError, setDescriptionError] = React.useState(true);
    let [duplicateTitle, setDuplicateTitle] = React.useState(false);

    //cancel
    let cancel = () => {
        props.parentCallback({
            action: 'cancel',
            data: {}
        });
    };

    let add = () => {
        console.log(checkDuplicateTitle());
        if (checkDuplicateTitle()) {
            setDuplicateTitle(true);
            console.log(duplicateTitle);
            return;
        }
        if (titleError || descriptionError) return;
        props.parentCallback({
            action: 'submit',
            data: {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                deadline: "placeholder-deadline",
                priority: document.getElementById("priority").value
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

    let validateEmpty = () => {
        let taskTitle = document.getElementById("title");
        let taskDescription = document.getElementById("description");
        if (taskTitle.value === "") setTitleError(true);
        else setTitleError(false);
        if (taskDescription.value === "") setDescriptionError(true);
        else setDescriptionError(false);

        if (checkDuplicateTitle()) {
            setTitleError(true);
            setDuplicateTitle(true);
            console.log("titleError: " + titleError);
            console.log("duplicateTitle: " + duplicateTitle);
        }

    }

    //return master object
    return (
        <>
            {/*title*/}
            <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
                <AddCircleIcon sx={{ verticalAlign: "-5px" }} /> Add Task
            </DialogTitle>
            {/*content*/}
            <DialogContent>
                {/*title*/}
                <br /><br />
                <TextField onChange={validateEmpty} error={titleError} helperText={titleError ? duplicateTitle ? "Task title already exists!" : "Title is Required!" : ''} id="title" label="Title" variant="outlined" fullWidth />
                {/*description*/}
                <br /><br />
                <TextField onChange={validateEmpty} error={descriptionError} helperText={descriptionError ? "Description is Required!" : ''} id="description" label="Description" variant="outlined" fullWidth />
                {/*deadline*/}
                <br /><br />
                <DateTime dataFromParent={deadline} dataToParent={deadline} />
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
                        <FormControlLabel value="low" control={<Radio />} label="Low" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="high" control={<Radio />} label="High" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            {/*action buttons*/}
            <DialogActions sx={{ bgcolor: 'white' }}>
                {/*add button*/}
                <Button onClick={add} variant="contained" color='primary' sx={{ width: 100 }}>
                    <AddCircleIcon />&nbsp;Add
                </Button>
                {/*cancel button*/}
                <Button onClick={cancel} variant="contained" color='error' sx={{ bgcolor: '#f44336', width: 100 }}>
                    <i className="fa fa-fw fa-lg fa-ban"></i>&nbsp;Cancel
                </Button>
            </DialogActions>
        </>
    );
}