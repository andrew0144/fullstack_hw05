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

//master export
export default function ResponsiveDialog(props) {
    //variables
    let [deadline] = React.useState(props.dataFromParent.deadline);

    //cancel
    let cancel = () => {
        props.parentCallback({
            action: 'cancel',
            data: {}
        });
    };

    //return master object
    return (
        <>
            {/*title*/}
            <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
                <AddCircleIcon /> Add Task
            </DialogTitle>
            {/*content*/}
            <DialogContent>
                {/*title*/}
                <br /><br />
                <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth />
                {/*description*/}
                <br /><br />
                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth />
                {/*deadline*/}
                <br /><br />
                <DateTime dataFromParent={deadline} dataToParent={deadline} />
                {/*priority*/}
                <br /><br />
                <FormControl>
                    <FormLabel id="priority-label">Priority</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="priority-label"
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
                <Button onClick={cancel} variant="contained" color='primary' sx={{ width: 100 }}>
                    <AddCircleIcon />&nbsp;Add
                </Button>
                {/*cancel button*/}
                <Button onClick={cancel} variant="contained" color='error' sx={{ bgcolor: '#f44336', width: 100 }}>
                    <i className="fa fa-fw fa-ban"></i>&nbsp;Cancel
                </Button>
            </DialogActions>
        </>
    );
}