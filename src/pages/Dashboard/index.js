import React,{useState, useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom";
import { Col, Container, Row, Card, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import accessToken from "helpers/jwt-token-access/accessToken";

const Dashboard = () => {
  const [menu, setMenu] = useState(false)
  const toggle = () => {
    setMenu(!menu)
  }
  const [total, setTotal] = useState({})

  const getTotal = async () => {

    const options = {
         method: 'GET',
         headers: new Headers({'Authorization': accessToken}),        
   };
    const baseURL = process.env.REACT_APP_BASEURL
    const response = await fetch(`${baseURL}/api/admin/profile`, options)
    const total = await response.json();
    setTotal(total.data)
    console.log(total.data)
  }

  useEffect(() => {
    getTotal()
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Cashpally | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center mb-5">
              <Col md={8}>
                <h6 className="page-title">Cashpally Admin Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Cashpally Admin Dashboard</li>
                </ol>
              </Col>
            </Row>

            <Row>
            <Col lg={4}>
              <Card body className='text-center'>
                <Link className='text-success'
                  to="/all-users"
                >
                  <h2>All Users</h2>
                  <h2 className="text-dark">{total.all_user}</h2>
                  

                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className='text-center'>
                <Link className='text-success'
                  to="/all-companies"
                >
                  <h2>Auto  Partners</h2>
                  <h2 className="text-dark">{total.company}</h2>
                  

                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-center">
                <Link className='text-success'
                  to="/all-debtors"
                >
                  <h2>All Debtors</h2>
                  <h2 className="text-dark">{total.debtors}</h2>

                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-center">
                <Link className='text-success'
                  to="/all-loans"
                >
                  <h2>All Loans</h2>
                  <h2 className="text-dark">₦ {total.all_loan}</h2>

                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-center">
                <Link className='text-success'
                  to="/pending-loans"
                >
                  <h2>Pending Loans</h2>
                  <h2 className="text-dark">₦ {total.pending_loan}</h2>

                </Link>
              </Card>
            </Col>
            <Col lg={4}>
              <Card body className="text-center">
                <Link className='text-success'
                  to="/"
                >
                  <h2>Refunded Loans</h2>
                  <h2 className="text-dark">₦ {total.refunded_loan}</h2>

                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-center">
                <Link className='text-success'
                  to="/all-debtors"
                >
                  <h2>Total Debt</h2>
                  <h2 className="text-dark">₦ {total.debt}</h2>

                </Link>
              </Card>
            </Col>

          </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard