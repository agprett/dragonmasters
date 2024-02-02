import './Footer.css'
import logo from '../../images/logo.png'
import githubImg from '../../images/github-mark.png'

function Footer() {
  return (
    <footer id="main-footer">
      <div id="copyright-stuff">
        <img className="small-logo" src={logo} alt="logo" />
        <h3>DragonMasters</h3>
        <p>&copy;2023 DragonMasters</p>
      </div>

      <div id="social-stuff">
        <a className="social-link">
          <img className="social-img" src={githubImg} alt="Github"/>
          <p>Github</p>
        </a>
      </div>
    </footer>
  )
}

export default Footer