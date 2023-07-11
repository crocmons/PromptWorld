import "@styles/globals.css"
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { ThemeProvider } from "next-themes";


export const metadata = {
 title:'PromptMaker',
 description:'Discover & Generate AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
       <body>
        <Provider>
      <ThemeProvider attribute="class">
          <div className="main">
              <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
       </ThemeProvider>
          </Provider>
       </body>
    </html>
  )
}

export default RootLayout