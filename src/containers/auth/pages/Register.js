import { useFormik } from 'formik'
import React from 'react'
import { Row, Col, FormGroup, Input, Label, Container, Button } from 'reactstrap'
import api from '../../../util/api'
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            registerClickHandler(values);
        }
    })
    const registerClickHandler = async (values) => {
        try {
            const response = await api.post('/auth/signup', values)
            if (response.status === 200) {
                toast.success(response.data.message)
                // localStorage.setItem(CONSTANTS.LOCAL_USER_DATA_KEY, JSON.stringify(response.data.user))
                // dispatch(userLoginSuccess(response.data.user))
                navigate("/login")
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
                                First name
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="firstName"
                                placeholder="First Name"
                                {...formik.getFieldProps('firstName')}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">
                                Last name
                            </Label>
                            <Input
                                id="examplePassword"
                                name="lastName"
                                placeholder="Last Name"
                                {...formik.getFieldProps('lastName')}
                            />
                        </FormGroup>
                    </Col>
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
                                {...formik.getFieldProps('email')}
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
                        Already have an account ? <Link to="/login"> Login </Link>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Register