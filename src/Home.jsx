import styles from './Home.module.css'
import ProfilePicture from './assets/ProfilePicture.png'
import ContactMe from './assets/Contact.png'
import Projects from './assets/Projects.png'
import TLWebsiteExample from './assets/TLWebsiteImage.png'
import { useRef } from 'react'

const PresentationCard = ({Img, Title, Description, elementRef}) => {
    return <div className={styles.PresentationCard} onClick={e => {
        elementRef.current.scrollIntoView({behavior: "smooth"})
    }}>
                    <div className={styles.PresentationCardTitleContainer}>
                        <img className={styles.PresentationCardImage} src={Img}></img>
                        <h2 className={styles.PresentationCardTitle}>{Title}</h2>
                    </div>
                    <h3 className={styles.PresentationCardDescription}>{Description}</h3>
                </div>;
}

const Home = ({contactMeRef, projectsRef, homeRef}) => {

    return <><div ref={homeRef}></div><div className={styles.HomeContainer}>
        <div className={styles.PresentationContainer}>
            <img className={styles.ProfilePicture} src={ProfilePicture}></img>
            <h1 className={styles.PresentationTitle}>Hi!</h1>
            <h2 className={styles.PresentationDescription}>I'm mhm, a Junior Web Developer</h2>
            <div className={styles.PresentationCardsContainer}>
                <PresentationCard elementRef={contactMeRef} Img={ContactMe} Title={"Contact Me"} Description={"You Can Contact Me On Our (Me and Skalpha's) Discord Server to Order a Website/DiscordBot (The Discord Bot Is Provided Thanks to him!), Websites are for a Very cheap Price Though, so I Expect You To Rate Me On My Discord After Buying a One!"}></PresentationCard>
                <PresentationCard elementRef={projectsRef} Img={Projects} Title={"Projects"} Description={"Wanna Take a Look on my Projects ? After You Look at Them You Will Probably Know Whether to Try My Service Or Not!"}></PresentationCard>
            </div>
            <h1 className={styles.ContactMeTitle} ref={contactMeRef}>Contact Me</h1>
            <div className={styles.ContactMeContainerContainer}>
                <div className={styles.ContactMeContainer}>
                    <img className={styles.ContactMePfp} src={ProfilePicture}></img>
                    <p className={styles.ContactMeDescription}>you can contact me on this discord <a className={styles.DiscordHref} href={"https://discord.gg/MTZJea9tZZ"}>https://discord.gg/MTZJea9tZZ</a> if you want a website/tierlistbot ( the bot is provided by skalpha ), or if you want to yapp!</p>
                </div>
            </div>
            <h1 ref={projectsRef} className={styles.ProjectsTitle}>Uploaded Websites</h1>
            <div className={styles.ProjectsContainerContainer}>
                <div className={styles.ProjectsContainer}>
                    <a className={styles.Project} target='_blank' href='https://tiers.plus'>
                        <h1 className={styles.ProjectTitle}>{"Minecraft Tierlist Website Template"}</h1>
                        <h3 className={styles.ExampleImgTitle}>Example Image: </h3>
                        <img className={styles.WebsiteImage} src={TLWebsiteExample}></img>
                    </a>
                </div>
            </div>
        </div>
    </div></>
}

export default Home;