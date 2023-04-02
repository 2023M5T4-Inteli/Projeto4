import ActionsTd from '@/components/actionsTd'
import AdminWrapper from '@/components/adminWrapper'
import TableComponent from '@/components/table'
import Head from 'next/head'
import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface Props {}

const AdminGroups: React.FC<Props> = () => {
    const [groups, setGroups] = useState([
        {
            _imei: '/VCW7329YRFBIFB',
            imei: 'VCW7329YRFBIFB',
            idGroup: '#4901289',
            status: 'Aprovado'
        },
        {
            _imei: '/VCW7329YRFBIFB',
            imei: 'VCW7329YRFBIFB',
            idGroup: '#4901289',
            status: 'Recusado'
        },
        {
            _imei: '/VCW7329YRFBIFB',
            imei: 'VCW7329YRFBIFB',
            idGroup: '#4901289',
            status: 'Em análise'
        }
    ])

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'IMEI',
                        accessor: 'imei'
                    },
                    {
                        Header: 'Grupo',
                        accessor: 'idGroup',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                        Cell: (props: any) => {
                            if(props.value == 'Aprovado'){
                                return <b><p style={{color: "#006400"}}>Aprovado</p></b>
                            }else if(props.value == 'Recusado'){
                                return <b><p style={{color: "#8B0000"}}>Recusado</p></b>
                            }else{
                                return <b><p style={{color: "#e7d000"}}>Em análise</p></b>
                            }
                        }
                    },
                    {
                        Header: 'Analisar',
                        accessor: '_imei',
                        Cell: (props: any) => {
                            const actions = [
                                {
                                    link: '/admin/indemnity/' + props.value,
                                    icon: FaSearch,
                                    color: '#02DE82',
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
