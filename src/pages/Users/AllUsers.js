import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Table, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import axios from "axios";
import accessToken from "helpers/jwt-token-access/accessToken";

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  // const getUsers = async () => {

  //   const options = {
  //        method: 'GET',
  //        headers: new Headers({'Authorization': accessToken}),        
  //  };
  //   const baseURL = process.env.REACT_APP_BASEURL
  //   const response = await fetch(`${baseURL}/api/admin/all-users`, options)
  //   const users = await response.json();
  //   setUsers(users.data)
  //   setLoading(false)
  //   console.log(users.data)
  // }

  // useEffect(() => {
  //   getUsers()
  // }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
        const baseURL = process.env.REACT_APP_BASEURL
        const response = await fetch(`${baseURL}/api/admin/all-users`, options)
        const users = await response.json();
        setUsers(users.data)
        setLoading(false)
        console.log(users.data)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);

  const data = {
    columns: [
      {
        label: "#",
        field: "",
        sort: "asc",
        width: 100,
      },
      {
        label: "Firstname",
        field: "first_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Lastname",
        field: "last_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone",
        field: "phone",
        sort: "asc",
        width: 100,
      },
      {
        label: "Username",
        field: "username",
        sort: "asc",
        width: 150,
      },
      {
        label: "DOB",
        field: "date_of_birth",
        sort: "asc",
        width: 100,
      },
      {
        label: "Gender",
        field: "gender",
        sort: "asc",
        width: 100,
      },
      {
        label: "Loan Status",
        field: "loan_status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        first_name: "Beasky Dev",
        last_name: "System Architect",
        email: "Edinburgh",
        phone: "61",
        username: "2011/04/25",
        date_of_birth: "$320",
        gender: "Male",
        loan_status: 'loaned',
        status: 'active'
      },
    ],
  }



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>All users | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Cashpally" title="Users" breadcrumbItem="All users" />

          {/* <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">All Users </CardTitle>
                  {
                    loading ?
                    (
                      <p>Loading....</p>
                    ) :
                    (
                      <MDBDataTable responsive bordered rows={users} columns={data.columns} />
                    )
                  }

                  
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <Row>


            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">All Users</CardTitle>
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
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Username</th>
                          <th>DOB</th>
                          <th>Gender</th>
                          <th>Loan Status</th>
                          <th>Payout Account</th>
                          {/* <th>Selfie</th> */}
                          <th>Status</th>
                          {/* <th>Government ID</th> */}
                        </tr>
                      </thead>
                      <tbody>
                          {users.map((user, index) => {
                            const {id, first_name, last_name, email, date_of_birth, gender,loan_status, payout_account, phone, selfie, status, user_government_id, username, wallet} = user
                            return <tr key={id}>
                              <td>{index + 1}</td>
                              <td>{first_name}</td>
                              <td>{last_name}</td>
                              <td>{email}</td>
                              <td>{phone}</td>
                              <td>{username}</td>
                              <td>{date_of_birth}</td>
                              <td>{gender}</td>
                              <td>{loan_status}</td>
                              <td>{!payout_account ? '' : payout_account.account_no}</td>
                              {/* <td>{selfie}</td> */}
                              <td>{status}</td>
                              {/* <td>{user_government_id}</td> */}
                              
                            </tr>
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

export default AllUsers
