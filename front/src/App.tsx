import React, {useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import "./App.css"

import GlobalStyle from './styles/global';

import { 
  Container, 
  Typography,
  Button, 
  Modal,
  TextField,
} from '@material-ui/core';
import Todo from './components/Todo';
import api from './services/api';

interface TodoProps{
  id:number;
  title: string;
  description: string;
}

function getModalStyle() {
  return {
    top: `30vh`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header:{
      height: "120px",
      backgroundColor: "#121318",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: "2rem",
      marginBottom: '1rem'
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
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
        width: '100%',
      },
    },
    content: {
      padding: theme.spacing(1),
    }
  }),
);

function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [description, setDescription] = useState('');

  async function loadData(){
    api.get('/todos').then(res => {
      if(res.status === 201){
        setTodos(res.data)
      }
    }).catch(err => {console.log(err)})
  }

  React.useEffect(() => {
    loadData();
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    api.post('/todos', {title, description}).then(res =>{
      if(res.status === 201){
        setTitle('');
        setDescription('');
        loadData();
        setOpen(false);
      }
    })
  };

  const body = (
    <div style={modalStyle} className={classes.paper} id="modal">
      <Typography variant="h5" component="h2" gutterBottom id="simple-modal-title">Novo TODO</Typography>
      <Typography variant="h6" component="h3" gutterBottom id="simple-modal-description">
        Preencha todos os campos
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue={title}
          variant="outlined"
          placeholder='Título'
          onChange={(event)=> setTitle(event.target.value)}
        />
        <TextField
          placeholder='Descrição'
          required
          id="outlined-required"
          label="Required"
          defaultValue={description}
          variant="outlined"
          onChange={(event)=> setDescription(event.target.value)}
        />
        <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>Salvar</Button>
      </form>
   </div>
  );

  return (
    <>
    <Container maxWidth={false} className={classes.header}>
      <Typography variant="h4" component="h1" gutterBottom>
        My To Do List
      </Typography>    
    </Container>
      <GlobalStyle/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         {body}
      </Modal>
      <Container maxWidth="md" className='container'>
        <Button variant="contained" color="primary" onClick={handleOpen}>Cadastrar novo to do</Button>
        <Container className={classes.content}>
          {todos.length === 0 ? 
            <Typography variant="h5" component="h2" gutterBottom >Nenhum todo encontrado</Typography> : 
          todos.map(todo => (
            <Todo 
              key={todo.id} 
              id={todo.id} 
              title={todo.title} 
              description={todo.description}
              loadData={loadData}
            />
          ))}
        </Container>
      </Container>
    </>
  );
}

export default App;
