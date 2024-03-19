import React from 'react'
import { useSelector } from 'react-redux';
function Footer() {

  const userName = useSelector(state=> state.auth.name)
  return (
    <div>  
        {userName ? (
      <p>Zalogowany jako: {userName}</p>
    ) : (
      <p>Niezalogowany</p>
    )}
    </div>
  )
}

export default Footer