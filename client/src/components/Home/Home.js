import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPosts, getPostsBySearch } from "../../actions/posts";

import Pagination from "../Pagination.jsx";

import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();

  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // show and hide search and create form
  const [showSearch, setShowSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // search post function
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  // enable search by hit enter key
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  // search by tags chipinput functions
  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  // button tips
  const ButtonTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} setShowForm={setShowForm} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper} elevation={6}>
              <ButtonTooltip title="Search Posts">
                <Button
                  onClick={() => setShowSearch(!showSearch)}
                  color="primary"
                >
                  <SearchIcon fontSize="large" />
                </Button>
              </ButtonTooltip>
              <ButtonTooltip title="Create a Post">
                <Button onClick={() => setShowForm(!showForm)} color="primary">
                  <CreateIcon fontSize="large" />
                </Button>
              </ButtonTooltip>
            </Paper>

            {showSearch && (
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Posts"
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
            )}

            {showForm && (
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            )}

            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
