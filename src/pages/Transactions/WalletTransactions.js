import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Table, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import accessToken from "helpers/jwt-token-access/accessToken";
import CurrencyFormat from "react-currency-format";

const WalletTransactions = () => {
  const [walletTransactions, setWalletTransactions] = useState([])
  const [loading, setLoading] = useState(true)


  const getWalletTransactions = async () => {

    const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
    const baseURL = process.env.REACT_APP_BASEURL
    const response = await fetch(`${baseURL}/api/admin/transaction/wallet`, options)
    const walletTransactions = await response.json();
    setWalletTransactions(walletTransactions.data)
    setLoading(false)
    console.log(walletTransactions.data)
  }

  useEffect(() => {
    getWalletTransactions()
  }, [])



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Wallet Transactions | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Cashpally" title="Transactions" breadcrumbItem="Wallet Transactions" />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Wallet Transactions</CardTitle>
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
                          {walletTransactions.map((transaction, index) => {
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

export default WalletTransactions
