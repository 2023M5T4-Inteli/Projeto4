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
import { Button } from '@/components/button'
import { useRouter } from 'next/router'


interface Props { }


const AdminDashboard: React.FC<Props> = props => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Admin - Dashboard</title>
            </Head>
            <AdminWrapper title='Dashboard'
                subtitle='Ainda não há nenhum grupo ativo!'>

                <Button onClick={() => router.push('/admin/contract/new')}>Criar grupo!</Button>

            </AdminWrapper>
        </>
    )
}



export default AdminDashboard
