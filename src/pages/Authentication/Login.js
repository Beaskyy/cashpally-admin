import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState } from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Form,
  Label,
  Input,
  Container,
} from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import saveToken from '../../useToken'

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logoSm from "../../assets/images/cashpally-logo-sm.png"

async function loginAdmin(credentials) {
  const baseURL = process.env.REACT_APP_BASEURL
  return fetch(`${baseURL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then(data => data.json())
}

const Login = ({ setToken }, props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // handle submit
  const handleSubmit = e => {
    e.preventDefault()
    console.log(loginAdmin)
    const token = loginAdmin({
      email,
      password,
    })
    saveToken(token)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Cashpally Admin Dashboard</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50">
                      Sign in to continue to Cashpally Admin.
                    </p>
                    <Link to="/" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <div className="p-3">
                      <div className="mb-3">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </Col>
                        <Col sm={6} className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
