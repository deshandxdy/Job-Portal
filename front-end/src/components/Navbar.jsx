import React, { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(true);

    const handleMenuOpen = () => {
        setMenuOpen(! isMenuOpen)
    }

  return (
    <header>Navbar</header>
  )
}

export default Navbar