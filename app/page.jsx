//import MainPage from '../components/mainpage'
import SandBox from './sandbox';

export const metadata = {
    title: process.env.siteTitle,
    description: 'A sample webapp using OpenAI ChatGPT API',
    viewport: 'maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=0',
    icons: {
        icon: '/logo192.png',
        shortcut: '/logo192.png',
    }
}

export default function Page({ props }) {
    return <SandBox {...props} />
}