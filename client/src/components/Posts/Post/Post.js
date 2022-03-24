import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";

const Post = ({ post, setCurrentId, setShowForm }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  // delete popup modal state
  const [open, setOpen] = useState(false);

  // use to simplify code
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {/* {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`} */}
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  // comments count component
  const CommentsCount = () => {
    if (post.comments.length > 0) {
      return (
        <>
          <CommentIcon fontSize="small" />
          &nbsp;{post.comments.length}
        </>
      );
    }
    return (
      <>
        <CommentOutlinedIcon fontSize="small" />
      </>
    );
  };

  // button tips
  const ButtonTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  // popup modal body for delete
  const modalBody = (
    <div className={classes.paper}>
      <h2 id="modal-title">Are you sure to delete this post?</h2>
      <div className={classes.buttonGroup}>
        <Button size="small" variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  const openPost = () => history.push(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="details"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        {/* edit button */}
        {userId === post?.creator && (
          <div className={classes.overlay2}>
            <ButtonTooltip title="Edit">
              <Button
                style={{ color: "white" }}
                size="small"
                // onClick={() => setCurrentId(post._id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                  setShowForm(true);
                }}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </ButtonTooltip>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {/* comments count button */}
        <ButtonTooltip title="Comment">
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={openPost}
          >
            <CommentsCount />
          </Button>
        </ButtonTooltip>

        {/* delete button */}
        {userId === post?.creator && (
          <ButtonTooltip title="Delete">
            <Button size="small" color="primary" onClick={() => setOpen(true)}>
              <DeleteIcon fontSize="small" />
              {/* Delete */}
            </Button>
          </ButtonTooltip>
        )}
        {/* popup delete modal */}
        <Modal
          open={open}
          className={classes.modal}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {modalBody}
        </Modal>

      </CardActions>
    </Card>
  );
};

export default Post;
