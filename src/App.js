import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DefaultLayout } from './layouts'
import { publicRoutes } from './routes'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout
                        const Page = route.component

                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
