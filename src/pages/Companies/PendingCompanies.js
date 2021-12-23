import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Button,
  CardImg,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import accessToken from "helpers/jwt-token-access/accessToken"
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PendingCompanies = () => {
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
          `${baseURL}/api/admin/company/pending`,
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

  // update company...
  const updateCompany = async (id) => {
    console.log(id);
    if (confirm("Are you sure you want to activate the company?")) {
      // do stuff
      try {
        const options = {
          method: "PUT",
          headers: new Headers({
            Authorization: accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ company_id: id }),
        }
        const baseURL = process.env.REACT_APP_BASEURL
        const response = await fetch(
          `${baseURL}/api/admin/company/activate`,
          options
        )
        const data = await response.json()
        console.log(data)
        // Alert message
        toast.success(data.message)
        if (data.status == "Success") {
          //reload page
          setTimeout(function () {
            window.location.reload(1)
          }, 5500)
        }
      } catch (error) {
        // do what
      }
    } else {
      return false
    }   
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
            breadcrumbItem="Pending Auto Partners"
          />
          <Row>
            <ToastContainer
              draggable={false}
              transition={Zoom}
              autoClose={5000}
            />
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Pending Auto Partners</CardTitle>
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
                              document,
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
                                        tog_standard()
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
                                        <Button
                                          className="btn btn-success"
                                          onClick={() =>
                                            updateCompany(partner.id)
                                          }
                                        >
                                          Activate
                                        </Button>
                                      </div>
                                    </Modal>
                                  </div>
                                </td>
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

export default PendingCompanies
