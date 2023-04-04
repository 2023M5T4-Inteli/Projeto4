import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import withContexts from '@/HOC/withContexts'

import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import '../styles/npstyle.css'
import axios from '../../axios'
import { useUser } from '@/contexts/user'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
    const { user, setUser } = useUser()
    useEffect(() => {
        if (!user) {
            axios.get('/users/me').then(res => setUser(res.data)).catch(err => console.log(err))

        }
    })

    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <Component {...pageProps} />
            <ToastContainer />
        </ThemeProvider>
    )
}

export default withContexts(App) 
