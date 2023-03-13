/* eslint-disable react/display-name */
import React from 'react'
import axios from '../../axios'
import Router from 'next/router'
import { parseCookies } from 'nookies'

const RequireAuthentication = (
    WrappedComponent: any,
    isAdmin?: boolean,
) => {
    return class extends React.Component {
        static async getInitialProps(ctx: any) {
            let token = null
            if (ctx.req) {
                const { token: tokenFromCookies } = parseCookies(ctx)
                token = tokenFromCookies
            }

            try {
                let user = null
                if (isAdmin) {
                    if (ctx.req) {
                        const { data } = await axios.get('/users/isadmin', {
                            headers: {
                                Cookie: `token=${token};`
                            }
                        })

                        user = data
                    } else {
                        let { data } = await axios.get('/users/isadmin')
                        user = data
                    }
                } else {
                    if (ctx.req) {
                        let response = await axios.get('/users/me', {
                            headers: {
                                Cookie: `token=${token};`
                            }
                        })
                        user = response.data
                    } else {
                        let { data } = await axios.get('/users/me')
                        user = data
                    }
                }

                if (WrappedComponent.getInitialProps) {
                    const pageProps = await WrappedComponent.getInitialProps(
                        ctx,
                        token
                    )
                    return { ...pageProps, user }
                }

                return { user }
            } catch (err) {
                if (ctx.req) {
                    ctx.res.writeHead(302, {
                        Location: '/login'
                    })
                    ctx.res.end()
                } else {
                    Router.push('/login')
                }
            }
            return {}
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default RequireAuthentication
