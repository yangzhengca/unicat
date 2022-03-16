import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {createPost, updatePost} from '../../actions/posts'
import { useHistory } from "react-router-dom";




const Form = ({currentId,setCurrentId}) => {
 
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post=useSelector((state)=>currentId ? state.posts.posts.find((p)=> p._id === currentId):null)

  const classes = useStyles();
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  useEffect(()=>{
    if(post) setPostData(post)
  },[post])

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };


  const handleSubmit =async (e) => {
      e.preventDefault()

      if(currentId===0){
        dispatch(createPost({...postData,name:user?.result?.name}, history ))

        clear()
      }else{        
        dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
        clear()
      }
     
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own post, like other's posts and leave your comment.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId? 'Editing': "Creating"} a post</Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth="true"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth="true"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags(separated with coma)"
          fullWidth="true"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth="true">Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth='true'>Clear</Button>  
        
      </form>
    </Paper>
  );
};

export default Form;
