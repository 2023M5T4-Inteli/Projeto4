import ActionsTd from '@/components/actionsTd'
import AdminWrapper from '@/components/adminWrapper'
import TableComponent from '@/components/table'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import axios from '../../../../axios'
import Loader from '@/components/loader'
import { BiWallet } from 'react-icons/bi'
import RequireAuthentication from '@/HOC/requireAuthentication'

interface Props {}

const AdminGroups: React.FC<Props> = () => {
    const [groups, setGroups] = useState([])

    const getGroups = async () => {
        try {
            const res = await axios.get('/insurance/admin')
            setGroups(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getGroups()
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Id',
                        accessor: 'id'
                    },
                    {
                        Header: 'Número de participantes',
                        accessor: 'users',
                        Cell: (props: any) => <span>{props.value.length}</span>
                    },
                    {
                        Header: 'Valor total no contrato',
                        accessor: 'contractTotalValue',
                        Cell: (props: any) => <span>{props.value}ETH</span>
                    },
                    {
                        Header: 'Status',
                        accessor: 'isActive',
                        Cell: (props: any) =>
                            props.value ? (
                                <span>Ativo</span>
                            ) : (
                                <span>Inativo</span>
                            )
                    },
                    {
                        Header: 'Ações',
                        accessor: '_id',
                        Cell: (props: any) => {
                            const actions = [
                                {
                                    link: `/admin/groups/${props.value}`,
                                    icon: FaRegEye,
                                    color: '#02DE82'
                                },
                                {
                                    link: `/admin/groups/wallet/${props.value}`,
                                    icon: BiWallet,
                                    color: 'orange'
                                }
                            ]

                            return <ActionsTd actions={actions} />
                        }
                    }
                ]
            }
        ],
        []
    )

    const data = React.useMemo(() => [...groups], [groups])

    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title="Grupos"
                subtitle="Confira todos os grupos mútuos com contratos já ativos ou inativados."
            >
                <TableComponent columns={columns} data={data} />
            </AdminWrapper>
        </>
    )
}

export default RequireAuthentication(AdminGroups, true)
