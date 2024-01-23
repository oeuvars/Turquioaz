import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import DesktopNavbar from './navbar/DesktopNavbar'
import MobileNavbar from './navbar/MobileNavbar'

const Navbar: React.FC = () => {
   const isAboveSmallScreens = useMediaQuery("(min-width: 914px)")
  return (
    <>
      {isAboveSmallScreens ? (
         <DesktopNavbar />
      ) : (
         <MobileNavbar />
      )}
    </>
  )
}

export default Navbar
