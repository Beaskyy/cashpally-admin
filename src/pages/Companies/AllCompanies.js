import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  CardImg,
  Button,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import axios from "axios"
import accessToken from "helpers/jwt-token-access/accessToken"

const AllCompanies = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal_standard, setmodal_standard] = useState(false)
  const [partner, setPartner] = useState({})

  function tog_standard(partner) {
    setPartner(partner)
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

    function removeBodyCss() {
      document.body.classList.add("no_padding")
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: new Headers({ Authorization: accessToken }),
        }
        const baseURL = process.env.REACT_APP_BASEURL
        const response = await fetch(
          `${baseURL}/api/admin/company/all`,
          options
        )
        const companies = await response.json()
        setCompanies(companies.data)
        setLoading(false)
        console.log(companies.data)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchData()
  }, [])

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
        loan_status: "loaned",
        status: "active",
      },
    ],
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>All Companies | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs
            maintitle="Cashpally"
            title="Auto Partners"
            breadcrumbItem="All Auto Partners"
          />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">All Auto Partners</CardTitle>
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table className="table responsive table-bordered mt-2 mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Status</th>
                            <th>Action</th>
                            {/* <th>Contact Name</th>
                          {/* <th>Selfie</th>
                          <th>Status</th> */}
                            {/* <th>Government ID</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {companies.map((company, index) => {
                            const {
                              id,
                              city,
                              company_name,
                              company_address,
                              phone,
                              company_email,
                              state,
                              status,
                              contact,
                            } = company
                            return (
                              <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{company_name}</td>
                                <td>{company_address}</td>
                                <td>{company_email}</td>
                                <td>{phone}</td>
                                <td>{city}</td>
                                <td>{state}</td>
                                <td>{status}</td>
                                <td>
                                  <div className="text-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        tog_standard(company)
                                      }}
                                      className="btn btn-primary waves-effect waves-light"
                                      data-toggle="modal"
                                      data-target="#myModal"
                                    >
                                      view
                                    </button>
                                    <Modal
                                      isOpen={modal_standard}
                                      toggle={() => {
                                        tog_standard(company)
                                      }}
                                      scrollable={true}
                                    >
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title mt-0"
                                          id="myModalLabel"
                                        >
                                          Auto Partner details
                                        </h5>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setmodal_standard(false)
                                          }}
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <Row>
                                          <h5 className="mb-4 text-success">
                                            Company Information
                                          </h5>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Company name: </strong>
                                              {partner.company_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Email: </strong>
                                              {partner.company_email}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Address: </strong>
                                              {partner.company_address}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Phone: </strong>
                                              {partner.phone}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>State: </strong>
                                              {partner.state}
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <h5 className="mb-4 text-success">
                                            Contact Information
                                          </h5>
                                          <Col lg={6}>
                                            <p>
                                              <strong>First name: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.title}{" "}
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.first_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Last name: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.last_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Address: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.address}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Phone: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.phone}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Gender: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.gender}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>DOB: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.DOB}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>City: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.city}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>State: </strong>
                                              {!partner.contact
                                                ? "null"
                                                : partner.contact.state}
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <h5 className="mb-4 text-success">
                                            Document
                                          </h5>
                                          <Col md={12} lg={12} xl={12}>
                                            <Card>
                                              <CardImg
                                                top
                                                className="img-fluid"
                                                src={
                                                  !partner.document
                                                    ? ""
                                                    : partner.document.CAC
                                                }
                                                alt={
                                                  !partner.contact
                                                    ? ""
                                                    : partner.contact.first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  CAC
                                                </CardTitle>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                          <Col md={12} lg={12} xl={12}>
                                            <Card>
                                              <CardImg
                                                top
                                                className="img-fluid"
                                                src={
                                                  !partner.document
                                                    ? ""
                                                    : partner.document.id_card
                                                }
                                                alt={
                                                  !partner.contact
                                                    ? ""
                                                    : partner.contact.last_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  ID Card
                                                </CardTitle>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        </Row>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            tog_standard(company)
                                          }}
                                          className="btn btn-secondary waves-effect"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </Modal>
                                  </div>
                                </td>
                                {/* <td>{user_government_id}</td> */}
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AllCompanies
