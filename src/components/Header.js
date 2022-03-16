import React from 'react';
// import  PropTypes from 'prop-types';
import Button from './Button';

const Header = ({title, onAdd, showAdd}) => {

  //  const onClick = () => {
  // console.log("Header Prop Clicked");
  //  }

  return (
    <div className='header'>
       <h1>
        {title}
       </h1>
       <Button color={showAdd ? 'red' : 'green' } text={showAdd ? 'Close' : 'Add' } onClick={onAdd}/>
    </div>
  )
}

Header.defaultProps = {
    title: 'Hello',
}

// Header.propTypes = {
//     title: PropTypes.string.isRequired,
// }

export default Header;