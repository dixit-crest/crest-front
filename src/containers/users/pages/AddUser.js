import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Row, Col, FormGroup, Input, Label, Container, Button } from 'reactstrap'
import api from '../../../util/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLoginSuccess } from '../../../redux/auth/actions'
import CONSTANTS from '../../../util/constants'

const AddUser = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    // const user = useSelector(state => state.auth)

    const formik = useFormik({
        initialValues: params?.id ? {
            firstName: '',
            lastName: '',
            email: 'dixit.p@crestinfosystems.net',
            ...user
        } : {
            firstName: '',
            lastName: '',
            email: 'dixit.p@crestinfosystems.net'
        },
        onSubmit: (values) => {
            editUser(values);
        }
    })


    const editUser = async (values) => {
        try {
            const response = await api.put(`/users/${params?.id}`, values)
            if (response.status === 200) {
                toast.success(response.data.message)
                getUser()
                return
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getUser = async () => {
        try {
            const response = await api.get(`/users/${params.id}`)
            if (response.status === 200) {
                toast.success(response.data.message)
                formik.setValues(response.data.user)
                return
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getUser()
    }, [params.id])

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col xl={4} md={6}>
                        <FormGroup tag={"form"} onSubmit={formik.handleSubmit}>
                            <Label for="exampleEmail">
                                First name
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="firstName"
                                placeholder="Enter email"
                                {...formik.getFieldProps('firstName')}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl={4} md={6}>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="lastName"
                                placeholder="Enter email"
                                {...formik.getFieldProps('lastName')}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl={4} md={6}>
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
                    <Col xl={4} md={6}>
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
                    <Col md={12}>
                        <Button onClick={formik.handleSubmit} type="submit">Submit</Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddUser