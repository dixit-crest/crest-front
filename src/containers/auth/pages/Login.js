import { useFormik } from 'formik'
import React from 'react'
import { Row, Col, FormGroup, Input, Label, Container, Button } from 'reactstrap'
import api from '../../../util/api'
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createBrowserHistory } from 'history';
import { userLoginSuccess } from '../../../redux/auth/actions'
import CONSTANTS from '../../../util/constants'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: 'dixit.p@crestinfosystems.net',
        },
        onSubmit: (values) => {
            loginClickHandler(values);
        }
    })
    const loginClickHandler = async (values) => {
        try {
            const response = await api.post('/auth/signin', values)
            if (response.status === 200) {
                toast.success(response.data.message)
                localStorage.setItem(CONSTANTS.LOCAL_USER_DATA_KEY, JSON.stringify(response.data.user))
                dispatch(userLoginSuccess(response.data.user))
                navigate("/")
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const requestForgetPassword = async () => {
        try {
            if (!formik.values.email) return toast.info("Please enter your email address to get your password.");
            const response = await api.post('/auth/request-reset-password', { email: formik.values.email })
            if (response.status === 200) {
                toast.success(response.data.message)
                return
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <React.Fragment>
            <Container>
                <Row className='mt-5'>
                    <Col md={6}>
                        <FormGroup tag={"form"} onSubmit={formik.handleSubmit}>
                            <Label for="exampleEmail">
                                Email
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="Enter email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Enter password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={8}>
                        <Button onClick={formik.handleSubmit} type="submit">Submit</Button>
                    </Col>
                    <Col md={4}>
                        <p onClick={() => requestForgetPassword()}>Forgot password ?</p>
                    </Col>
                    <Col md={4}>
                        Not have an account ? <Link to="/register">Register yourself </Link>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Login