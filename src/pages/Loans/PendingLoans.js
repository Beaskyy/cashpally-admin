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
  Button,
  Modal,
  CardImg,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import accessToken from "helpers/jwt-token-access/accessToken"
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CurrencyFormat from "react-currency-format"

const PendingLoans = () => {
  const [pendingLoans, setPendingLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal_standard, setmodal_standard] = useState(false)
  const [loan, setLoan] = useState({})

  function tog_standard(loan) {
    setLoan(loan)
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
          `${baseURL}/api/admin/pending-loans`,
          options
        )
        const pendingLoans = await response.json()
        setPendingLoans(pendingLoans.data)
        setLoading(false)
        console.log(pendingLoans.data)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchData()
  }, [])

  // approve loan

  const approveLoan = async (id) => {
    console.log(id)
    if (confirm("Are you sure you want to approve this loan?")) {
      // do stuff
      try {
        const options = {
          method: "PUT",
          headers: new Headers({
            Authorization: accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ loan_id: id }),
        }
        const baseURL = process.env.REACT_APP_BASEURL
        const response = await fetch(
          `${baseURL}/api/admin/loan/approve`,
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

  // decline loan

  const declineLoan = async (id, reason) => {
    console.log(id)
    if (prompt("What is your reason for declining this loan?")) {
      // do stuff
      try {
        const options = {
          method: "PUT",
          headers: new Headers({
            Authorization: accessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            loan_id: id,
            reason: "",
          }),
        }
        const baseURL = process.env.REACT_APP_BASEURL
        const response = await fetch(
          `${baseURL}/api/admin/loan/decline`,
          options
        )
        const data = await response.json()
        console.log(data)
        // Alert message
        toast.danger(data.message)
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
          <title>Pending Loans | Cashpally Admin</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs
            maintitle="Cashpally"
            title="Loans"
            breadcrumbItem="Pending Loans"
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
                  <CardTitle className="h4">All Loans</CardTitle>
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
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Initial Amount</th>
                            <th>Outstanding balance</th>
                            <th>Loan Status</th>
                            <th>User Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingLoans.map((transaction, index) => {
                            const {
                              id,
                              amount,
                              status,
                              description,
                              initial_amount,
                              current_amount,
                              current_duration_in_days,
                              user,
                            } = transaction
                            return (
                              <tr key={id}>
                                <td>{index + 1}</td>
                                <CurrencyFormat
                                  value={amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <td>{status}</td>
                                <td>{description}</td>
                                <td>{current_duration_in_days} days</td>
                                <CurrencyFormat
                                  value={initial_amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <CurrencyFormat
                                  value={current_amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  renderText={value => <td>{value}</td>}
                                />
                                <td>{user.loan_status}</td>
                                <td>{user.status}</td>
                                <td>
                                  <div className="text-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        tog_standard(transaction)
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
                                        tog_standard(transaction)
                                      }}
                                      scrollable={true}
                                    >
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title mt-0"
                                          id="myModalLabel"
                                        >
                                          Loan details
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
                                            Loan Information
                                          </h5>
                                          <Col lg={6}>
                                            <strong>Amount: </strong>
                                            <CurrencyFormat
                                              value={loan.amount}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₦"}
                                              renderText={value => (
                                                <span>{value}</span>
                                              )}
                                            />
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Description: </strong>
                                              {loan.description}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Loan Status: </strong>
                                              {loan.status}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Request Date: </strong>
                                              {loan.created_at}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Duration: </strong>
                                              {
                                                loan.current_duration_in_days
                                              }{" "}
                                              days
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <strong>Initial Amount: </strong>
                                            <CurrencyFormat
                                              value={loan.initial_amount}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₦"}
                                              renderText={value => (
                                                <p>{value}</p>
                                              )}
                                            />
                                          </Col>
                                          <Col lg={6}>
                                            <strong>
                                              Outstanding Balance:{" "}
                                            </strong>
                                            <CurrencyFormat
                                              value={loan.current_amount}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₦"}
                                              renderText={value => (
                                                <p>{value}</p>
                                              )}
                                            />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <h5 className="mb-4 text-success">
                                            User Information
                                          </h5>
                                          <Col lg={6}>
                                            <p>
                                              <strong>First name: </strong>
                                              {!loan.user
                                                ? "null"
                                                : loan.user.first_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Last name: </strong>
                                              {!loan.user
                                                ? "null"
                                                : loan.user.last_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Email: </strong>
                                              {!loan.user
                                                ? "null"
                                                : loan.user.email}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Phone: </strong>
                                              {!loan.user
                                                ? "null"
                                                : loan.user.phone}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Gender: </strong>
                                              {!loan.user
                                                ? "null"
                                                : loan.user.gender}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Loan Status: </strong>
                                              {!loan.user
                                                ? "null"
                                                : loan.user.loan_status}
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
                                                  !loan.user
                                                    ? "null"
                                                    : loan.user.selfie
                                                }
                                                alt={
                                                  !loan.user
                                                    ? "null"
                                                    : loan.user.first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  Selfie
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
                                                  !loan.user
                                                    ? "null"
                                                    : loan.user
                                                        .user_government_id
                                                }
                                                alt={
                                                  !loan.user
                                                    ? "null"
                                                    : loan.user.first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  Means of Identification
                                                </CardTitle>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <h5 className="mb-4 text-success">
                                            Voucher One Information
                                          </h5>
                                          <Col lg={6}>
                                            <p>
                                              <strong>First name: </strong>
                                              {!loan.voucher_one
                                                ? "null"
                                                : loan.voucher_one.first_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Last name: </strong>
                                              {!loan.voucher_one
                                                ? "null"
                                                : loan.voucher_one.last_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Email: </strong>
                                              {!loan.voucher_one
                                                ? "null"
                                                : loan.voucher_one.email}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Phone: </strong>
                                              {!loan.voucher_one
                                                ? "null"
                                                : loan.voucher_one.phone}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Gender: </strong>
                                              {!loan.voucher_one
                                                ? "null"
                                                : loan.voucher_one.gender}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Loan Status: </strong>
                                              {!loan.voucher_one
                                                ? "null"
                                                : loan.voucher_one.loan_status}
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
                                                  !loan.voucher_one
                                                    ? "null"
                                                    : loan.voucher_one.selfie
                                                }
                                                alt={
                                                  !loan.voucher_one
                                                    ? "null"
                                                    : loan.voucher_one
                                                        .first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  Selfie
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
                                                  !loan.voucher_one
                                                    ? "null"
                                                    : loan.voucher_one
                                                        .user_government_id
                                                }
                                                alt={
                                                  !loan.voucher_one
                                                    ? "null"
                                                    : loan.voucher_one
                                                        .first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  Means of Identification
                                                </CardTitle>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <h5 className="mb-4 text-success">
                                            Voucher Two Information
                                          </h5>
                                          <Col lg={6}>
                                            <p>
                                              <strong>First name: </strong>
                                              {!loan.voucher_two
                                                ? "null"
                                                : loan.voucher_two.first_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Last name: </strong>
                                              {!loan.voucher_two
                                                ? "null"
                                                : loan.voucher_two.last_name}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Email: </strong>
                                              {!loan.voucher_two
                                                ? "null"
                                                : loan.voucher_two.email}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Phone: </strong>
                                              {!loan.voucher_two
                                                ? "null"
                                                : loan.voucher_two.phone}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Gender: </strong>
                                              {!loan.voucher_two
                                                ? "null"
                                                : loan.voucher_two.gender}
                                            </p>
                                          </Col>
                                          <Col lg={6}>
                                            <p>
                                              <strong>Loan Status: </strong>
                                              {!loan.voucher_two
                                                ? "null"
                                                : loan.voucher_two.loan_status}
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
                                                  !loan.voucher_two
                                                    ? "null"
                                                    : loan.voucher_two.selfie
                                                }
                                                alt={
                                                  !loan.voucher_two
                                                    ? "null"
                                                    : loan.voucher_two
                                                        .first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  Selfie
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
                                                  !loan.voucher_two
                                                    ? "null"
                                                    : loan.voucher_two
                                                        .user_government_id
                                                }
                                                alt={
                                                  !loan.voucher_two
                                                    ? "null"
                                                    : loan.voucher_two
                                                        .first_name
                                                }
                                              />
                                              <CardBody>
                                                <CardTitle className="h4">
                                                  Means of Identification
                                                </CardTitle>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        </Row>
                                      </div>
                                      <div className="modal-footer">
                                        <Button
                                          className="btn btn-danger"
                                          onClick={() => declineLoan(loan.id)}
                                        >
                                          Decline
                                        </Button>
                                        <Button
                                          className="btn btn-success"
                                          onClick={() => approveLoan(loan.id)}
                                        >
                                          Approve
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

export default PendingLoans
