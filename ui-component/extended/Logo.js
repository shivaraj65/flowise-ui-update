import logo from 'assets/images/flowise_logo.png'
import logoDark from 'assets/images/flowise_logo_dark.png'

import { useSelector } from 'react-redux'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <div style={{ alignItems: 'center', flexDirection: 'row' }}>
            <h1 style={{ margin: '0' }}>GenStudio.AI</h1>
            <p style={{ margin: '5px 0 0 0 ' }}>Powered by Atom.AI</p>
        </div>
    )
}

export default Logo
