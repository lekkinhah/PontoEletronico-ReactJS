import React, { useState, useEffect } from 'react'
import { Table, Button, notification } from 'antd';
import { useQuery, useSubscription, useMutation } from 'react-apollo';
import { myRegisteredTimes, createRegisteredTime } from '../graphql/gql';

import DateTimeText from '../components/DateTimeText';


const columns = [
    {
        title: 'Data',
        dataIndex: 'timeRegistered',
        key: 'date',
        render: (text, record, index) => {
          return (<DateTimeText dateTimeString={text} />)
        }
    },
    {
        title: 'Hora',
        dataIndex: 'timeRegistered',
        key: 'time',
        render: (text, record, index) => {
          return (<DateTimeText dateTimeString={text} mode="time" />)
        }
    },
];

export default function Books() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [active, setActive] = useState(false)

    const { data, loading: queryLoading, refetch } = useQuery(myRegisteredTimes)
    const [mutate,  { loading: mutationLoading }] = useMutation(createRegisteredTime)

    async function addRegisteredTime() {
        const timeRegistered = new Date().toISOString();

        const { data, errors } = await mutate({
            variables: {
                data: { timeRegistered }
            }
        })
        if (!errors)
            notification.success({
                message: 'Novo registro recebido'
            })
        else
            notification.erro({
                message: 'Não foi possível registrar'
            })

        refetch()
    }

    return (
        <React.Fragment>
            <span>Profissional {user.name}</span>
            <Button type="primary" onClick={addRegisteredTime} style={{ marginLeft: 16, marginBottom: 16 }}>
                Novo registro
            </Button>
            <Table dataSource={data && data.myRegisteredTimes} loading={queryLoading || mutationLoading} columns={columns} pagination={false} />
        </React.Fragment>
    )
}
