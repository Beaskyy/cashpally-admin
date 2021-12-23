import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Table, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import accessToken from "helpers/jwt-token-access/accessToken";
import CurrencyFormat from "react-currency-format";

const SuccessfulRepayments = () => {
  const [successfulRepayments, setSuccessfulRepayments] = useState([])
  const [loading, setLoading] = useState(true)


  const getSuccessfulRepayments = async () => {

    const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
    const baseURL = process.env.REACT_APP_BASEURL
    const response = await fetch(`${baseURL}/api/admin/loan/repayment-successful`, options)
    const successfulRepayments = await response.json();
    setSuccessfulRepayments(successfulRepayments.data)
    setLoading(false)
    console.log(successfulRepayments.data)
  }

  useEffect(() => {
    getSuccessfulRepayments()
  }, [])



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Successful Repayments | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Cashpally" title="Repayments" breadcrumbItem="Successful Repayments" />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Successful Repayments</CardTitle>
                  {
                    loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <p>Loading...</p>
                    </div>
                    )
                    : (
                      <div className="table-responsive">
                    <Table className="table responsive table-bordered mt-2 mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Id</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Type</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Loan Status</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                          {successfulRepayments.map((transaction, index) => {
                            const {id, amount, status, type, user, loan} = transaction
                            return (
                              <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{id}</td>
                                <CurrencyFormat
                                  value={amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <td>{status}</td>
                                <td>{type}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.loan_status}</td>
                                <td>{user.status}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </Table>
                  </div>
                    )
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SuccessfulRepayments
