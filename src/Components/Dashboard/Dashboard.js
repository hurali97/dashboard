import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Form from './Form';
import ListElements from './ListElements';
import Spinner from './Spinner';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    background:'white',
    height:'100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
     
    },
    
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient( #50c878,#5FB5A7 )',
   
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    display:'block',
    justifyContent:'flex-start',
    background:'white',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ResponsiveDrawer extends React.Component {
  
  state = {
    mobileOpen: false,
    name:'',
  loaded:false,
  homeOPEN: false,
  
  };

  handleClick = () => {

        this.setState({ homeOPEN: !this.state.homeOPEN })
        this.setState({name:''});

}

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

 
onButtonClick=(name)=>{
 this.setState({name:name});

}

_renderDrawerContents = () => {
  const { classes } = this.props;

  return  <div>
        <div className={classes.toolbar} />
      <Divider />
        <List style={{paddingTop:'0px',paddingBottom:'0px'}}>
            <ListElements nested={classes.nested} 
          clickFunction={this.onButtonClick}
          handleClick={this.handleClick}
          homeOPEN={this.state.homeOPEN}
          />
          
        </List>
        <Divider />
    </div>
}


_renderPageContent = () => {

  const { classes } = this.props;

  return  <Form content={classes.content} toolbar={classes.toolbar} 
  inputheight={classes.input} homeOPEN={this.state.homeOPEN}
  name={this.state.name} 
  onsignout={this.props.onsignout}/>
}

  render() {
    const { classes, theme } = this.props;

    return (
    (this.props.success===true)
    ?( <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor:'#50c878'}}>
      
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap >
             Admin DashBoard
             
          </Typography>
        
        </Toolbar>
    
       
      </AppBar>
     
      <nav className={classes.drawer} >
        
        <Hidden smUp implementation="css">
      
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
         
          >
      
            { this._renderDrawerContents() }
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
         
            variant="permanent"
            open
          >
             { this._renderDrawerContents() }
         
          </Drawer>
        </Hidden>
       
      </nav>
     
      {
      this.state.name!==''
     ?<div>
          
     { this._renderPageContent() }
     
     </div>
     :( 
      <main className={classes.content} >
      <div className={classes.toolbar} />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
      <h5 onClick={this.props.onsignout}
          style={{color:'#50C878', textDecoration: 'underline', cursor: 'pointer'}}
          >
          Sign Out </h5>
          </div>
     <div style={{textAlign: 'center'}} >
     <Typography paragraph>
       <div >
         <Spinner />
     
         <h3  style={{color:'#50C878', fontWeight : 'bold'}}> Welcome Admin !</h3>
         
       </div>
     </Typography>
     </div>
      </main>)
      }

    

    }
    
    </div>)
    : null
     
    );
  }
}

ResponsiveDrawer.propTypes = {
  
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
