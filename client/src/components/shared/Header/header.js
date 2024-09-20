import React from "react"
import './index.css'
import { useState } from "react";

function Header(props) {
    function logOutUser() {
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location = "/"
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    function navToHome() {
        window.location = "/"
    }

    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    }

    
    return <>
        <div className="dashnavbar">
            <div className="dashlogo">
                <div className="dashlogo_logo" onClick={navToHome}>
                ◾ foodsaver
                </div>
                <div className="navs">
                <a className="nav" href="/discover">Discover</a>
                <a className="nav" href="/map">Map</a>
                {props.signedIn ? <>
                    <a className="nav" href="/dashboard">My Dashboard</a>
                    </>:<>
                </>
                }
            </div>
            </div>
            <div className="dashbtns">

                {props.signedIn ? <>
                    <div className="dashbtn diffbtn" onClick={logOutUser}>
                        Log Out
                    </div>
                </> :
                    <>
                        <div className="a dashbtn diffbtn" onClick={props.openLogIn}>
                            Log In
                        </div>
                        <div className="a dashbtn" onClick={props.openSignUp}>
                            Sign Up
                        </div>

                    </>}
            </div>

            {dropdownOpen && (
                <div className="dropdown-menu">
                <div className="mobile_signed_in">

                    {
                        props.signedIn ? <>
                        <a className="mobile_link" href="/discover">Discover</a>
                        <a className="mobile_link" href="/map">Map</a>
                        <div className="mobile_logout" onClick={logOutUser}>
                        LogOut
                        </div>
                        </>:
                        <>
                            <a className="mobile_link"  href="/discover">Discover</a>
                            <a className="mobile_link" href="/map">Map</a>
                            <div className="mobile_login" onClick={props.openLogIn}>
                            LogIn
                            </div>
                        </>
                    }
                    </div>

                </div>
            )}

            <div className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="fa fa-bars">{dropdownOpen ? "Close" : "Menu"}</i> {/* Change the text based on dropdownOpen state */}
          </div>
                      
        </div>

    </>
}

export default Header;