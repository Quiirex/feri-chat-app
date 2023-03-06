import { useState } from 'react'
import './App.scss'
import Chat from "../chat/Chat"

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
    const [count, setCount] = useState(0)

    function move(): void {
        window.location.href = '/chat'
    }

    return (
        <div className="App">
            <div>
                <a href="https://github.com/electron-vite/electron-vite-react" target="_blank">
                    <img src="./electron-vite.svg" className="logo" alt="Electron + Vite logo" />
                </a>
            </div>
            <div className="card">
                {/* <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button> */}
                <p>Demo (sign in with google doesn't work) in desktop version</p>
                {<Chat />}
                {/* <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p> */}
            </div>
            {/* <p className="read-the-docs">
                Click on the Electron + Vite logo to learn more
            </p>
            <div className="flex-center">
                Place static files into the<code>/public</code> folder <img style={{ width: "5em" }} src={nodeLogo} alt="Node logo" />
            </div> */}
        </div>
    )
}

export default App