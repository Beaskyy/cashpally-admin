import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ti-home"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-user"></i>
                <span>{props.t("Users")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/all-users">{props.t("All Users")}</Link>
                </li>
                <li>
                  <Link to="/all-debtors">{props.t("All Debtors")} </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-loop"></i>
                <span>{props.t("Transactions")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/all-transactions">
                    {props.t("All Transactions")}
                  </Link>
                </li>
                <li>
                  <Link to="/credit-transactions">
                    {props.t("Credit Transactions")}
                  </Link>
                </li>
                <li>
                  <Link to="/Debit-transactions">
                    {props.t("Debit Transactions")}
                  </Link>
                </li>
                <li>
                  <Link to="/wallet-transactions">
                    {props.t("Wallet Transactions")}
                  </Link>
                </li>
                <li>
                  <Link to="/bank-transactions">
                    {props.t("Bank Transactions")}
                  </Link>
                </li>
                <li>
                  <Link to="/pending-transactions">
                    {props.t("Pending Transactions")}
                  </Link>
                </li>
                <li>
                  <Link to="/successful-transactions">
                    {props.t("Successful Transactions")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-wallet"></i>
                <span>{props.t("Loans")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/all-loans">{props.t("All Loans")}</Link>
                </li>
                <li>
                  <Link to="/pending-loans">{props.t("Pending Loans")}</Link>
                </li>
                {/* <li>
                  <Link to="/">{props.t("Overdue Loans")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/loan-range">{props.t("Loan Range")}</Link>
                </li> */}
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-receipt"></i>
                <span>{props.t("Repayments")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/successful-repayments">
                    {props.t("Successful Repayments")}
                  </Link>
                </li>
                <li>
                  <Link to="/pending-repayments">
                    {props.t("Pending Repayments")}
                  </Link>
                </li>
                <li>
                  <Link to="/declined-repayments">
                    {props.t("Declined Repayments")}
                  </Link>
                </li>
                <li>
                  <Link to="/failed-repayments">
                    {props.t("Failed Repayments")}
                  </Link>
                </li>
                <li>
                  <Link to="/web-repayments">{props.t("Web Repayments")}</Link>
                </li>
                <li>
                  <Link to="/mobile-repayments">
                    {props.t("Mobile Repayments")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-car"></i>
                <span>{props.t("Auto Partners")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/all-companies">
                    {props.t("All Auto Partners")}
                  </Link>
                </li>
                <li>
                  <Link to="/pending-companies">
                    {props.t("Pending Auto Partners")}
                  </Link>
                </li>
                <li>
                  <Link to="/activated-companies">
                    {props.t("Activated Auto Partners")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
