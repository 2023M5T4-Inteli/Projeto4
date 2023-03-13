import ActionsTd from '@/components/actionsTd'
import AdminWrapper from '@/components/adminWrapper'
import TableComponent from '@/components/table'
import Head from 'next/head'
import React from 'react'
import { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'

interface Props {}

const AdminViewGroups: React.FC<Props> = () => {
    const [groups, setGroups] = useState([
        {
            _id: '#4901289',
            id: '#4901289',
            numberPeople: 20,
            contractTotalValue: 6000,
            status: true
        },
        {
            _id: '#90682405',
            id: '#90682405',
            numberPeople: 50,
            contractTotalValue: 2000,
            status: true
        },
        {
            _id: '#598252',
            id: '#598252',
            numberPeople: 40,
            contractTotalValue: 500,
            status: false
        },
    ])

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
                        accessor: 'numberPeople'
                    },
                    {
                        Header: 'Valor total no contrato',
                        accessor: 'contractTotalValue',
                        Cell: (props: any) => (
                            <span>R${props.value.toFixed(2)}</span>
                        )
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
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
                                    link: '/admin/groups/' + props.value,
                                    icon: FaRegEye,
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
                <>
                    <TableComponent columns={columns} data={data} />
                </>
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups
