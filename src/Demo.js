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
import Form from './Component/Form';
import 'tachyons';
import './App.css'
import {dataget, firebasePostRequest} from './FireBase'; 
import ListElements from './Component/ListElements';
import logo from './Logo_small.png';
import SignIn from './Component/SignIn'
import Spinner from './Component/Spinner';

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
  text:'',
  url:'',
  loaded:false,
  homeOPEN: false,
  
  };

  handleClick = (text) => {

    if (text === 'home') {
        this.setState({ homeOPEN: !this.state.homeOPEN })
        this.setState({name:''});
//console.log("haha")
    }
    else {
       // console.log("he he he");
    }

}

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

 
onButtonClick=(name)=>{

 
 this.setState({name:name});
this.homepagecontent("Home/".concat(name));

}



async homepagecontent(text){
  let url='';
 
url="Data/".concat(text);

  let data=await dataget(url);

if(!data){

  firebasePostRequest("Data/".concat(text),"","");
  data=await dataget(url);

}
 
this.setState({text:data.paragraph,url:data.url});

}

  render() {
    const { classes, theme } = this.props;


  const drawer = (
    <div>
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
);

    const FormContent=(
     
     <Form content={classes.content} toolbar={classes.toolbar} 
     inputheight={classes.input} homeOPEN={this.state.homeOPEN}
     name={this.state.name} text={this.state.text} url={this.state.url}
     onsignout={this.props.onsignout}/>
    );


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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        
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
      
            {drawer}
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
            {drawer}
         
          </Drawer>
        </Hidden>
       
      </nav>
     
      {
      //admin panel code
      this.state.name!==''
     ?<div>
          
     {FormContent}</div>
     :( 
      <main className={classes.content} >
      <div className={classes.toolbar} />
      <h5 onClick={this.props.onsignout}
          style={{color:'#50C878'}}
          className=" link  dim tr underline pointer">
          Sign Out </h5>
     <div className='tc' >
     <Typography paragraph>
       <div >
         <Spinner />
        <img src={logo} alt="logo"/>
         <h3 className='b f3' style={{color:'#50C878'}}> Welcome Admin !</h3>
         
       </div>
     </Typography>
     </div>
      </main>)
      }

    

    }
    
    </div>)
    :<SignIn />
     
    );
  }
}

ResponsiveDrawer.propTypes = {
  
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
