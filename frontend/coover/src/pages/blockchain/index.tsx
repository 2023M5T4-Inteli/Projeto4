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
                <h1>Como funciona o nosso seguro?</h1>
                <h2>O seguro mútuo é uma forma de proteção coletiva onde um grupo de pessoas
                    contribui com dinheiro para um fundo comum.
                </h2>
                <BlackBackground2>
                    <h4>
                        Aqui na Coover usamos "Contratos inteligentes" em uma plataforma blockchain,
                        gerando um seguro mútuo confiável e transparente para seu celular!
                    </h4>
                </BlackBackground2>
                <h2>
                    Estes "Contratos inteligentes" garantem a execução automática das regras do contrato e o cumprimento das obrigações de cada
                    membro do grupo!
                </h2>
                <BlackBackground2>
                    <h4>
                        Sem necessidade de terceira parte intermediária, reduzindo custos e fraudes.
                    </h4>
                </BlackBackground2>
                <h1>Como participar?</h1>
                <h2>Para participar dessa iniciativa você só precisa ter uma "Carteira digital" - Metamask- e pronto!
                    Você ja consegue se beneficiar do seguro mais tecnológico do Brasil!
                </h2>
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
