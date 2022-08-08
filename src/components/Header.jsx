import '../styles/Header.scss'
import WhiteLine from '../assets/svg/icons/brand-white-line.svg'
import GithubIcon from '../assets/svg/icons/github-header.svg'
import BusinessCard from '../assets/svg/business-card.svg'
import Tilt from 'react-parallax-tilt'
import HelpIcon from '@mui/icons-material/Help'
import PrintIcon from '@mui/icons-material/Print'
import DownloadIcon from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import { Link as ExternalLink, Tooltip } from '@mui/material'
import classnames from 'classnames'
import useScrollPosition from '@react-hook/window-scroll'

const Navigator = ({ target }) => {
    const scrollY = useScrollPosition(60)

    const onClick = () => {
        // This equation kind of worked out
        const offset =
            scrollY <= 50 ? window.innerHeight + 137 : window.innerHeight / 12
        const locationY =
            scrollY +
            document
                .getElementById(target.toLowerCase())
                .getBoundingClientRect().top -
            offset

        window.scrollTo(0, target === 'HOME' ? 0 : locationY)
    }

    return (
        <li>
            <ExternalLink onClick={onClick}>{target}</ExternalLink>
        </li>
    )
}

const Header = ({ belowFold }) => {
    const download = () => {
        fetch(process.env.PUBLIC_URL + '/img/business-card.png').then(
            response => {
                response.arrayBuffer().then(buffer => {
                    const url = window.URL.createObjectURL(new Blob([buffer]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute(
                        'download',
                        'John Marvie Biglang-awa - Business Card.png'
                    )
                    document.body.appendChild(link)
                    link.click()
                })
            }
        )
    }

    return (
        <div
            className={classnames('header', { headerScroll: belowFold })}
            id="header">
            <div className="brand-name-wrapper">
                <div className="brand-name">
                    <h6>marvie.web.app</h6>
                    <img src={WhiteLine} alt="" />
                </div>
            </div>

            <div className="view-on-github">
                <img src={GithubIcon} alt="" />
                <ExternalLink
                    href="https://github.com/swingspringer/my-portfolio"
                    target="_blank"
                    rel="noopener,noreferrer">
                    <h6>View on Github</h6>
                </ExternalLink>
            </div>

            <div className="bc-wrapper">
                <Tilt className="tilt-wrapper">
                    <img className="business-card" src={BusinessCard} alt="" />
                </Tilt>
                <div className="below-wrapper">
                    <Tooltip title="This is my digital Business Card! You can download it using the icon on the right 👉">
                        <HelpIcon />
                    </Tooltip>
                    <Button onClick={download}>
                        <DownloadIcon />
                    </Button>
                </div>
            </div>

            <div className="navigation-wrapper">
                <nav>
                    <ul>
                        <Navigator target="HOME" />
                        <Navigator target="PROJECTS" />
                        <Navigator target="CONTACT" />
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header
