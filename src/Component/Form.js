import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { firebasePostRequest } from '../FireBase';




class Form extends Component {


  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      url: props.url,
      snackbarText: '',
      open: false,
      vertical: 'top',
      horizontal: 'center',

    }
  }

  handleClick = state => () => {
    if (this.state.text.trim().length > 0 && this.state.url.trim().length > 0) {

      firebasePostRequest("Home/".concat(this.props.name), this.state.url, this.state.text);
      this.setState({ snackbarText: 'Content Updated !' })

    }
    else
      this.setState({ snackbarText: 'Content didn\'t Update because one or more fields empty !' })

    this.setState({ open: true, ...state });

  };

  handleClose = () => {
    this.setState({ open: false });
  };


  componentWillReceiveProps(pro) {

    this.setState({ text: pro.text, url: pro.url });
  }


  onText = (event) => {

    this.setState({ text: event.target.value });

  }

  onURL = (event) => {

    this.setState({ url: event.target.value });

  }



  render() {
    const vertical = this.state.vertical;
    const horizontal = this.state.horizontal;

    if(this.props.homeOPEN===true)
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

          <FormLabel >URL of video</FormLabel>
          <br></br>
          <br></br>
          <TextField
            value={this.state.url}
            onChange={this.onURL}
            style={{ width: '300%' }}
            id="inputURL"
            variant="outlined"
          />

          <br></br>
          <br></br>


          <FormLabel >Paragraph</FormLabel>
          <br></br>

          <TextField
            value={this.state.text}
            onChange={this.onText}
            id="inputTEXT"
            multiline
            rows="5"
            style={{ width: '300%' }}
            margin="dense"
            variant='outlined'
          />
          <br></br>
          <br></br>
          <Button
            variant="contained" color="primary"
            onClick={this.handleClick({
              vertical: 'top', horizontal: 'center'
              , text: this.state.text, url: this.state.url
            })}
            style={{ backgroundColor: 'rgb(90, 178, 168)' }}>
            Update
         </Button>

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={this.state.open}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarText}</span>}
          />

        
        </div>
      </main>

    );

    else{
      return(
     <div>
       
     </div>
      );
    }
  }
}
export default Form;
