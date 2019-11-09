import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd';
import { useQuery, useSubscription } from 'react-apollo';
import { allRegisteredTimes, onRegisteredTime } from '../graphql/gql';
import DateTimeText from '../components/DateTimeText';


const columns = [
    {
        title: 'Usuário',
        dataIndex: 'user.name',
        key: 'user',
    },
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
    const [active, setActive] = useState(false)

    const { data, loading, refetch, updateQuery } = useQuery(allRegisteredTimes)

    useSubscription(
      onRegisteredTime, 
      {
        onSubscriptionData({ subscriptionData }) {
            updateQuery((prev) => {
                if (!subscriptionData.data)
                    return prev

                return Object.assign({}, prev, {
                    allRegisteredTimes: [
                        ...prev.allRegisteredTimes,
                        subscriptionData.data.onRegisteredTime
                    ]
                })
            })
        }
    })

    useEffect(() => {
        refetch()
    }, [active, refetch])

    return (
        <React.Fragment>
            <Table dataSource={data && data.allRegisteredTimes} loading={loading} columns={columns} pagination={false} />
        </React.Fragment>
    )
}
