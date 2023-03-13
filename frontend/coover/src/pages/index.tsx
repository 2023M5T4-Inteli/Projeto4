import { Button } from '@/components/button'
import { RightIcon } from '@/components/rightIcon'
import { BlackBackground, LogoContainer, PageContainer } from '@/styles/pages'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CooverLogo from '../assets/images/coover_round_logo.png'

export default function Home() {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Coover</title>
            </Head>
            <PageContainer>
                <BlackBackground />

                <LogoContainer>
                    <Image src={CooverLogo} alt="Coover logo" />
                </LogoContainer>
                <h1>Coover</h1>
                <h2>Sua nova forma de se relacionar com seguros</h2>
                <Button onClick={() => router.push('/login')}>
                    Entrar <RightIcon />
                </Button>
            </PageContainer>
        </>
    )
}
