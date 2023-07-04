import siteLogo from "./../public/Images/Logo/logo-Orange.png"


const Footer = () => {
    return (
      <div className="footer">
            <footer className="footer-element">
                <p>2023© Smart@Space</p>
                <img src={siteLogo} alt="" />
            </footer>
      </div>
    );
  }
  
  export default Footer;