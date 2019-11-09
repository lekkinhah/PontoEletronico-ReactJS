import gql from 'graphql-tag'


export const signin = gql`
    mutation signin($email: String! $password: String!) {
        signin(email: $email password: $password) {
            token
            user {
                id
                name
                email
                role
            }
        }
    }
`

export const createUser = gql`
    mutation createUser($data: CreateUserInput!) {
        createUser(data: $data) {
            id
            name
            email
            role
        }
    }
`

export const myRegisteredTimes = gql`
    query myRegisteredTimes {
        myRegisteredTimes {
            id
            timeRegistered
            user {
                id
                name
                email
                role
            }
        }
    } 
`

export const allRegisteredTimes = gql`
    query allRegisteredTimes {
        allRegisteredTimes {
            id
            timeRegistered
            user {
                id
                name
                email
                role
            }
        }
    } 
`

export const createRegisteredTime = gql`
    mutation createRegisteredTime($data: CreateRegisteredTimeInput) {
        createRegisteredTime(data: $data) {
            id
            timeRegistered
            user {
                id
                name
                email
                role
            }
        }
    }
`

export const onRegisteredTime = gql`
    subscription {
        onRegisteredTime {
            id
            timeRegistered
            user {
                id
                name
                email
                role
            }
        }
    }
`