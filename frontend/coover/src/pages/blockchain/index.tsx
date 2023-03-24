import { Button } from '@/components/button'
import { RightIcon } from '@/components/rightIcon'
import { PageContainer2, BlackBackground2, BlackBackground } from '@/styles/pages'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CooverLogo from '../../assets/images/coover_round_logo.png'
import { BackIcon2 } from '@/components/backIcon'
import { useState } from 'react'
import Header2 from '@/components/header2'

export default function Home() {
    const [stage, setStage] = useState(0)
    const router = useRouter()

    const backHandler = () => {
        if (stage == 0) {
            router.replace("/")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    return (
        <>
            <PageContainer2>

                <Header2 />
                <BackIcon2 onClick={backHandler} />
                <BlackBackground2>
                    <h1>Como funciona o nosso seguro?</h1>
                </BlackBackground2>

                <h4 style={{width:"90%", fontSize: "17px"}}>
                    Aqui na Coover usamos "Contratos inteligentes" em uma plataforma blockchain,garantindo
                    a execução automática das regras do contrato e o cumprimento das obrigações de cada
                    membro do grupo. Sem necessidade de terceira parte intermediária, reduzindo custos e fraudes!
                </h4>

                <BlackBackground2>
                    <h1>Como participar?</h1>
                </BlackBackground2>

                <h4 style={{width:"90%", fontSize: "17px"}}>Para participar dessa iniciativa você só precisa ter uma "Carteira digital" - Metamask- e pronto!
                    Você ja consegue se beneficiar com o seguro mútuo confiável e transparente para seu celular!
                </h4>

                <h3>
                    <a href="https://metamask.io/">
                        Ainda não tem a Metamask? <br />
                        Crie agora!
                    </a>
                </h3>
                <Button onClick={() => router.push('/login')}>
                    Quero participar! <RightIcon />
                </Button>

            </PageContainer2>
        </>
    )
}
