import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom'
import './Login.scss'
import { useMutation } from 'react-apollo';
import { signin } from '../graphql/gql';


function Login({ form: { getFieldDecorator, validateFields, setFields } }) {
    const history = useHistory()

    const [mutate] = useMutation(signin)

    function handleSubmit(e) {
        e.preventDefault()

        validateFields(async (err, values) => {
            if (!err) {
                const { data } = await mutate({
                    variables: {
                        email: values.email,
                        password: values.password
                    }
                })
                if (!data.signin) {
                    setFields({
                        email: {
                            value: values.email,
                            errors: [new Error('')]
                        },
                        password: {
                            value: values.password,
                            errors: [new Error('E-mail ou senha inválida')]
                        },
                    })
                    return
                }

                if (data.signin.token) {
                    localStorage.setItem('token', data.signin.token)
                    localStorage.setItem('user', JSON.stringify(data.signin.user))
                    history.push(`/${data.signin.user.role.toLowerCase()}`)
                    return
                }
            }
        })

    }

    return (
        <div className="login-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Digite seu e-mail!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <div className="justify-between">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Entrar
                        </Button>
                        ou
                        <Link to="/register">registrar!</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );

}

export default Form.create({ name: 'login' })(Login)