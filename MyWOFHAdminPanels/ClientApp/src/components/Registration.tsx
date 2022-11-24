import React, { Component, useEffect, useReducer, useRef, useState, FC } from 'react';
import { Link, useHistory } from "react-router-dom";
// import { signIn, register } from '../core.js'
import { Form, Input, Button, Row, Col, ConfigProvider, Spin, Select, message, Result } from 'antd';
import {
    ExclamationOutlined,
    FontColorsOutlined,
} from '@ant-design/icons';
import ruRU from 'antd/es/locale/ru_RU';
import { loginAPI } from '../Services/loginAPI';
import { connect, useDispatch, useSelector } from 'react-redux';
import { resolveModuleName } from 'typescript';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { store } from '../store';
import { IsigIn } from '../types/types';
import { AuthActionsThunk } from '../store/Reducers/AuthReducer/authorizeReducer';

const FormItem = Form.Item;


const NormalLoginForm = () => {
    const store = useTypedSelector(store => store)
    const [form] = Form.useForm();
    const history = useHistory()
    const dispatcher = useDispatch()

    useEffect(() => {
        console.log('Reg store: ', store.authorize.isAuthorize)
        if(store.authorize.isAuthorize){
            history.push('/Counter')
        }
    }, [])

    let onFinish = async () => {

        let LoginDatas:IsigIn = {
            login: form.getFieldsValue(["loginFormItem"]).loginFormItem,
            password: form.getFieldsValue(["passWordFormItem"]).passWordFormItem
        }

        console.log("form.getFieldsValue: ", LoginDatas.login)

        dispatcher(AuthActionsThunk.login(LoginDatas))
    }

    let onFinishFailed = () =>{

    }

    return (
        <Form name="basic" form={form} onFinishFailed={() => onFinishFailed()} onFinish={() => onFinish()} autoComplete="off" className="login-form" >
            <FormItem name="loginFormItem" rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}>
                <Input prefix={<FontColorsOutlined />} placeholder="Логин" />
            </FormItem>
            <FormItem name="passWordFormItem" rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}>
                <Input.Password prefix={<ExclamationOutlined />} type="password" placeholder="Пароль" />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                    Вход
                </Button>
                <Link to="/Registration"> Регистрация</Link>
            </FormItem>
        </Form>
    )
}

const Register:FC = () => {
    const store = useTypedSelector(state => state)

    const loginDivStyle = {
        backgroundColor: '#e6f7ff',
        border: '3px solid #1890ff',
        borderRadius: '5px 25px 5px 25px',
    }

    let rootHeight = document.getElementById('root')?.style.height;

    return (

        <Spin spinning={store.authorize.spinValue}>
            <ConfigProvider locale={ruRU}>
                <div className='loginDiv' style={{ height: rootHeight }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className='loginDiv'>
                        <Row justify="space-around" align="middle">
                            <Col span={9} />
                            <Col span={6} style={loginDivStyle}>
                                <div style={{ margin: '15px', textAlign: 'center', fontSize: '21px' }}>
                                    <div>Пожалуйста, введите данные: </div>
                                    <NormalLoginForm />
                                </div>
                            </Col>
                            <Col span={9} />
                        </Row>
                    </div>
                </div>
            </ConfigProvider>
        </Spin>
    )
}
export default Register