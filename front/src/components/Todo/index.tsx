import React, { useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { 
  Card,
  CardContent, 
  IconButton,
  Typography,
  Button,
  Modal
}from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) => 
createStyles({
  root: {
    minWidth: 275,
    marginTop: "1rem",
  },
  content:{
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121318",
    width: "100%",
    marginBottom: "0 !important"
  },
  paper: {
    position: 'absolute',
    width: 500,
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  contentButton:{
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

function getModalStyle() {
  return {
    top: `30vh`,
  };
}

interface TodoProps{
  id:number;
  title: string;
  description: string;
  loadData: () => void;
}

function Todo({title, description, id, loadData}: TodoProps){
  const classes = useStyles();
  const [action, setAction] = React.useState('write')
  const [checked, setChecked] = React.useState(true);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (action: "write"|"delete") => {
    setAction(action);
    handleOpen();
  }

  const handleSubmit = React.useCallback(async(e: any) => {
    e.preventDefault();
    api.delete(`/todos/${id}`).then(res => {
      if(res.status === 201) {
        loadData();
        setOpen(false);
      }
    })
  }, [action, id, loadData]);

  const body = (
    <div style={modalStyle} className={classes.paper} id="modal">
      <Typography variant="h5" component="h2" gutterBottom id="simple-modal-title">{action === "write" ? title : "Atenção"}</Typography>
      <Typography variant="h6" component="h3" gutterBottom id="simple-modal-description">
        {action === "write" ? description : "Esta ação não pode ser revertida, deseja continuar?"}
      </Typography>
      <div className={classes.contentButton}>
        <Button variant="contained" color="primary" onClick={handleClose}>{action === "delete" ? "Cancelar" : "Fechar"}</Button>
        {action === "delete" && <Button variant="contained" color="secondary" onClick={handleSubmit}>Confirmar</Button>}
      </div>
   </div>
  );

  return (
    <Card className={classes.root} >
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         {body}
      </Modal>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {title}
        </Typography>
        <IconButton aria-label="ver" onClick={() => handleClick("write")} color="primary" >
          <VisibilityIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="delete" color="secondary"  onClick={() => handleClick("delete")}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default Todo;