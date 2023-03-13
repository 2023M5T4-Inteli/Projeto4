import AdminLoginForm from '@/components/adminLoginForm'
import AdminWrapper from '@/components/adminWrapper'
import Input from '@/components/input'
import {
    AuthBox,
    LeftContainer,
    PageContainer,
    RightContainer
} from '@/styles/pages/admin/auth'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Coover from '../../../assets/images/coover_logo.png'

interface Props {}

const AdminDashboard: React.FC<Props> = props => {
    return (
        <>
            <Head>
                <title>Admin - Dashboard</title>
            </Head>
            <AdminWrapper title='Dashboard'>
                <span>Oi</span>
            </AdminWrapper>
        </>
    )
}

export default AdminDashboard
