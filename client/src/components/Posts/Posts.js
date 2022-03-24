import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, setShowForm }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if(!posts.length && !isLoading) return 'No posts'; 

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} setShowForm={setShowForm} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
