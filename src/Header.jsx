import styles from './Header.module.css'
import Pfp from './assets/ProfilePicture.png'

const Header = ({contactMeRef, projectsRef, homeRef}) => {
    return <header className={styles.Header}>
        <img className={styles.HeaderPfp} src={Pfp}></img>
        <div className={styles.HeaderLabel} onClick={() => {homeRef.current.scrollIntoView({behavior: "smooth"})}}>{"< Home"}</div>
        <div className={styles.HeaderLabel} onClick={() => {contactMeRef.current.scrollIntoView({behavior: "smooth"})}}>{"< Contact Me"}</div>
        <div className={styles.HeaderLabel} onClick={() => {projectsRef.current.scrollIntoView({behavior: "smooth"})}}>{"< Projects"}</div>
    </header>
}

export default Header;