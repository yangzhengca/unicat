import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  image: {
    marginLeft: '10px',
    marginTop: '0px',

  },

  
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },

}));