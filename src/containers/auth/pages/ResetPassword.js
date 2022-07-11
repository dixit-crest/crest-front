import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Row, Col, FormGroup, Input, Label, Container, Button } from 'reactstrap'
import api from '../../../util/api'
import { toast } from 'react-toastify'
import { useNavigate, Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userLoginSuccess } from '../../../redux/auth/actions'
import CONSTANTS from '../../../util/constants'
import jwtDecode from 'jwt-decode'
const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isTokenValid, setIsTokenValid] = useState(true)
    const { token } = useParams()

    useEffect(() => {
        try {
            const decodedToken = jwtDecode(token)
            console.log(decodedToken);
            setIsTokenValid(true);
        } catch (error) {
            setIsTokenValid(false);
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: function (value) {
            console.log(value);
        },
        onSubmit: (values) => {
            resetPasswordClickHandler(values);
        }
    })
    const resetPasswordClickHandler = async (values) => {
        try {
            const decoded = jwtDecode(token)
            const response = await api.post('/auth/set-new-password', {...values, email: decoded.email})
            if (response.status === 200) {
                toast.success(response.data.message)
                navigate("/login")
                return
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <React.Fragment>
            {isTokenValid ?
                <Container>
                    <Row>
                        <Col md={6}>
                            <FormGroup tag={"form"} onSubmit={formik.handleSubmit}>
                                <Label for="exampleEmail">
                                    Password
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="password"
                                    placeholder="Enter password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">
                                    Confirm new Password
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="confirmPassword"
                                    placeholder="Enter password"
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <Button onClick={formik.handleSubmit} type="submit">Submit</Button>
                        </Col>
                        
                        <Col md={4}>
                            Not have an account ? <Link to="/register">Register yourself </Link>
                        </Col>
                    </Row>
                </Container>
                :
                <Container>
                    <h3>Session expired, please try again.</h3>
                </Container>
            }
        </React.Fragment>
    )
}

export default ResetPassword