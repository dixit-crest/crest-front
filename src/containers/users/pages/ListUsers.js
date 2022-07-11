import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import api from '../../../util/api'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const ListUsers = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const deleteUser = async (id) => {
        try {
            const response = await api.delete(`/users/${id}`)
            if (response.status === 200) {
                toast.success(response.data.message)
                getUsers()
                return
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const getUsers = async () => {
        try {
            const response = await api.get('/users')
            if (response.status === 200) {
                toast.success(response.data.message)
                setUsers(response.data.users)
                return
            }
            toast.error(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <React.Fragment>
            <Container>
                <Row>
                    {
                        users.map((user) => {
                            return (
                                <Col xs={12} sm={6} md={6} xl={4} xxl={3} key={user.id} className={"py-2"}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                {`${user.firstName} ${user.lastName}`}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                {user.email}
                                            </CardSubtitle>
                                            <Button color='danger' onClick={() => deleteUser(user.id)}>
                                                🚮
                                            </Button>
                                            <Button className='mx-2 ' onClick={() => navigate(`/users/${user.id}`)}>
                                                ✏
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ListUsers