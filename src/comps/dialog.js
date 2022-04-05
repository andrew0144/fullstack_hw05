//imports
    //react
        import React from 'react';
    //materials
        import Button from '@mui/material/Button';
        import DialogActions from '@mui/material/DialogActions';
        import DialogContent from '@mui/material/DialogContent';
        import DialogTitle from '@mui/material/DialogTitle';
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
                <DialogTitle sx = {{ bgcolor: 'primary.dark', color: 'white'}}>
                    X
                </DialogTitle>
            {/*content*/}
                <DialogContent>
                {/*deadline*/}
                    <br /><br />
                    <DateTime dataFromParent = {deadline} dataToParent = {deadline}/>
                </DialogContent>
            {/*action buttons*/}
                <DialogActions sx={{ bgcolor: 'white'}}>
                    {/*cancel button*/}
                        <Button onClick = {cancel} variant = "contained" color = 'error' sx = {{bgcolor: '#f44336', width: 100}}>
                        <i className = "fa fa-fw fa-ban"></i>&nbsp;Cancel
                    </Button>
                </DialogActions>
            </>
        );
    }