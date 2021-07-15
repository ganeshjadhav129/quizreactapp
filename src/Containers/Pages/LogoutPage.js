import React from 'react'

/**
* @author
* @function LogoutPage
**/

const LogoutPage = (props) => {
  props.history.push('/login');
  return (
    <div>LogoutPage</div>
  )

}

export default LogoutPage