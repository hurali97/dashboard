import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { ScaleLoader } from 'react-spinners';

 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ScaleLoader
          css={override}
          sizeUnit={"px"}
          size={50}
          color={'#50C878'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}
export default AwesomeComponent;