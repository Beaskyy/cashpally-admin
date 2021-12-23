import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import CurrencyFormat from 'react-currency-format'
import { MDBDataTable } from "mdbreact"
import { Table, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import axios from "axios";
import accessToken from "helpers/jwt-token-access/accessToken";

const AllDebtors = () => {
  const [debtors, setDebtors] = useState([])
  const [loading, setLoading] = useState(true)

  const getDebtors = async () => {

    const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
    const baseURL = process.env.REACT_APP_BASEURL
    const response = await fetch(`${baseURL}/api/admin/all-debtors`, options)
    const debtors = await response.json();
    setDebtors(debtors.data)
    setLoading(false)
    console.log(debtors.data)
  }

  useEffect(() => {
    getDebtors()
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
        name: "Tiger Nixon",
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
          <title>All Debtors | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Cashpally" title="Users" breadcrumbItem="All Debtors" />

          {/* <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">All Debtors </CardTitle>

                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row> */}

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">All Debtors</CardTitle>

                  {
                    loading ?
                    (
                      <div className="d-flex justify-content-center align-items-center">
                        <p>Loading...</p>
                      </div>
                    ) :
                    (
                      <div className="table-responsive">
                    <Table className="table responsive table-bordered mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th>Loan Status</th>
                          <th>Amount</th>
                          <th>Approval Date</th>
                          <th>Requested At</th>
                          <th>Current Amount</th>
                          <th>Duration (days)</th>
                          <th>Description</th>
                          <th>Discount</th>
                          <th>Discounted Amount</th>
                          <th>Due Date</th>
                          <th>Extensioin Status</th>
                          <th>Initial Amount</th>
                          <th>Initial Duration</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                          {debtors.map((debtor, index) => {
                            const {amount, approval_date, created_at, current_amount, current_duration_in_days, description, discount, discount_amount, due_date, extension_status, id, initial_amount, initial_duration_in_days, repayment_date, status, user} = debtor
                            return (
                              <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.gender}</td>
                                <td>{user.loan_status}</td>
                                <CurrencyFormat
                                  value={amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <td>{approval_date}</td>
                                <td>
                                  {created_at
                                    .toString()
                                    .replace(".000000Z", "")
                                    .replace("T", " ")}
                                </td>
                                <CurrencyFormat
                                  value={current_amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <td>{current_duration_in_days} days</td>
                                <td>{description}</td>
                                <td>{discount}</td>
                                <td>{discount_amount}</td>
                                <td>{due_date}</td>
                                <td>{extension_status}</td>
                                <CurrencyFormat
                                  value={initial_amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <td>{initial_duration_in_days} days</td>
                                <td>{status}</td>
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

export default AllDebtors
