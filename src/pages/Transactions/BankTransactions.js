import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Table, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import CurrencyFormat from 'react-currency-format'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import accessToken from "helpers/jwt-token-access/accessToken";

const BankTransactions = () => {
  const [bankTransactions, setBankTransactions] = useState([])
  const [loading, setLoading] = useState(true)


  const getBankTransactions = async () => {

    const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
    const baseURL = process.env.REACT_APP_BASEURL
    const response = await fetch(`${baseURL}/api/admin/transaction/bank`, options)
    const bankTransactions = await response.json();
    setBankTransactions(bankTransactions.data)
    setLoading(false)
    console.log(bankTransactions.data)
  }

  useEffect(() => {
    getBankTransactions()
  }, [])



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Bank Transactions | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Cashpally" title="Transactions" breadcrumbItem="Bank Transactions" />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Bank Transactions</CardTitle>
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
                          <th>Method</th>
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
                          {bankTransactions.map((transaction, index) => {
                            const {id, amount, method, status, type, user} = transaction
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
                                <td>{method}</td>
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

export default BankTransactions
