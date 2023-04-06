import ActionsTd from '@/components/actionsTd'
import AdminWrapper from '@/components/adminWrapper'
import TableComponent from '@/components/table'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from '../../../../axios'

interface Props {}

const AdminGroups: React.FC<Props> = () => {
    const [indemnities, setIndemnities] = useState([])

    const getIndemnities = async () => {
        try {
            const res = await axios.get('/indemnity/admin')
            setIndemnities(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getIndemnities()
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Usuário',
                        accessor: 'user.email'
                    },
                    {
                        Header: 'Valor',
                        accessor: 'value'
                    },
                    {
                        Header: 'Imei',
                        accessor: 'imei'
                    },
                    {
                        Header: 'Status',
                        accessor: 'isActive',
                        Cell: (props: any) => {
                            if (props.value) {
                                return (
                                    <b>
                                        <p style={{ color: '#006400' }}>
                                            Aprovado
                                        </p>
                                    </b>
                                )
                            } else {
                                return (
                                    <b>
                                        <p style={{ color: '#e7d000' }}>
                                            Em análise
                                        </p>
                                    </b>
                                )
                            }
                        }
                    },
                    {
                        Header: 'Ações',
                        accessor: '_id',
                        Cell: (props: any) => {
                            const actions = [
                                {
                                    link: '/admin/indemnity/' + props.value,
                                    icon: FaSearch,
                                    color: '#02DE82'
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

    const data = React.useMemo(() => [...indemnities], [indemnities])

    return (
        <>
            <Head>
                <title>Admin - Indenizações</title>
            </Head>
            <AdminWrapper
                title="Indenizações"
                subtitle="Confira as novas indenizações de seus clientes, além de ver o histórico de todas elas."
            >
                <TableComponent columns={columns} data={data} />
            </AdminWrapper>
        </>
    )
}

export default AdminGroups
