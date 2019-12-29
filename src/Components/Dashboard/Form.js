import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';




class Form extends Component {


  constructor(props) {
    super(props);

    this.state = {
     
      open: false,

    }
  }

  handleClick = state => () => {
 

    this.setState({ open: true, ...state });

  };

  handleClose = () => {
    this.setState({ open: false });
  };

 



  render() {

    return (

      <main className={this.props.content}>
        <div className={this.props.toolbar} />
        
         
        <div className='tl' >
          <Typography paragraph>
            <div >
              <h3 className='b f3'>Home Page / </h3>
              <h3>{this.props.name}</h3>
            </div>
          </Typography>

        <br></br>

        </div>
      </main>

   
      );
    
  }
}
export default Form;
