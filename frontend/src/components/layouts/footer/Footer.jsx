import React from "react";
import AppStore from "../../../images/Appstore.png"
import PlayStore from "../../../images/playstore.png"
import './footer.css'
const Footer = () => {
    return(
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download Our App</h4>
                <p>Download our app for Android and IOS mobile phone</p>
                <img src={AppStore} alt="AppStore"/>
                <img src={PlayStore} alt="PlayStore"/>
            </div>
            
            <div className="middleFooter">
                <h4>E-Commerace </h4>
                <p>High quality is our first priority</p>
                <p>Copyright 2021 &copy; Gourav</p>
            </div>
            
            <div className="rightFooter">
                <h4>Follow Us</h4>
                
            </div>
        </footer>
    )
}
export default Footer