import { Menu } from "../menu/Menu"

const Layout = ({ children }) => {
    return (
        <>
            <Menu />
            {children}
        </>
    )
}

export {
    Layout
}