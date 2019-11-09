import React from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom'
import './Register.scss'
import { useMutation } from 'react-apollo';
import { createUser } from '../graphql/gql';


function Register({ form: { getFieldDecorator, validateFields } }) {
    const history = useHistory()

    const [mutate, { loading }] = useMutation(createUser)

    function handleSubmit(e) {
        e.preventDefault()

        validateFields(async (err, values) => {
            if (!err) {
                const { data, errors } = await mutate({
                    variables: {
                        data: { ...values, role: "WORKER" }
                    }
                })

                if (!errors) {
                    notification.success({
                        message: 'Cadastrado com sucesso'
                    })
                    //history.push('/login')
                }
            }
        })
    }

    return (
        <div className="register-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Digite seu nome' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nome"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Digite seu email!' }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="E-mail"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Digite sua senha!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Senha"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <div className="justify-between">
                        <Button loading={loading} type="primary" htmlType="submit">
                            Registrar
                        </Button>
                        ou
                        <Link to="/login">entrar</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Form.create({ name: 'register' })(Register)