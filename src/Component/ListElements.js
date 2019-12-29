import React from 'react';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import AboutUs from '@material-ui/icons/AccountCircleOutlined';
import Help from '@material-ui/icons/HelpOutline';
import PilotProgram from '@material-ui/icons/AccessibleForward';
import Health from '@material-ui/icons/FavoriteBorder';
import Library from '@material-ui/icons/EventNote';
import Form from './Form';
import 'tachyons';

class ListElements extends React.Component {
    constructor(props) {
        super();
        this.state = {
           
        }
    }

    // handleClick = (text) => {

    //     if (text === 'home') {
    //         this.setState({ homeOPEN: !this.state.homeOPEN })

    //     }
    //     else {
    //         console.log("he he he");
    //     }

    // }






    render() {
        return (
            <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>

                <ListItem button onClick={() => this.props.handleClick('home')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={'Home Page'} />
                    {this.props.homeOPEN ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {

                    <Collapse in={this.props.homeOPEN} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>
                            <Divider />
                            {['About Us', 'Who Do We Help', 'VB Health Care', 'Pilot Programs', 'Library']
                                .map((text, index) => (
                                    <ListItem button key={text} 
                                    className={this.props.nested} onClick={() => this.props.clickFunction(text)}>
                                        <ListItemIcon>
                                            {
                                                (index === 0) ? <AboutUs />
                                                    : (index === 1) ? <Help />
                                                        : (index === 2) ? <Health />
                                                            : (index === 3) ? <PilotProgram />
                                                                : (index === 4) ? <Library />
                                                                    : console.log()

                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            <Divider />
                        </List>

                    </Collapse>

                }


            </List>

        );
    }

}

export default ListElements;