import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Table, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import accessToken from "helpers/jwt-token-access/accessToken";
import CurrencyFormat from "react-currency-format";

const PendingTransactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState([])
  const [loading, setLoading] = useState(true)


  const getPendingTransactions = async () => {

    const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
    const baseURL = process.env.REACT_APP_BASEURL
    const response = await fetch(`${baseURL}/api/admin/transaction/pending`, options)
    const pendingTransactions = await response.json();
    setPendingTransactions(pendingTransactions.data)
    setLoading(false)
    console.log(pendingTransactions.data)
  }

  useEffect(() => {
    getPendingTransactions()
  }, [])

  const data = {
    columns: [
      {
        label: "Firstname",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Lastname",
        field: "position",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "office",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Username",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "DOB",
        field: "salary",
        sort: "asc",
        width: 100,
      },
      {
        label: "Gender",
        field: "gender",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        name: "Beasky Dev",
        position: "System Architect",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
        salary: "$320",
        gender: "Male"
      },
    ],
  }



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Pending Transactions | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Cashpally" title="Transactions" breadcrumbItem="Pending Transactions" />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Pending Transactions</CardTitle>
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
                          {pendingTransactions.map((transaction, index) => {
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

export default PendingTransactions
