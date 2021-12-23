import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import AllUsers from "pages/Users/AllUsers"
import AllDebtors from "pages/Users/AllDebtors"
import LoanRange from "pages/Loans/LoanRange"
import AllTransactions from "pages/Transactions/AllTransactions"
import CreditTransactions from "pages/Transactions/CreditTransactions"
import DebitTransactions from "pages/Transactions/DebitTransactions"
import WalletTransactions from "pages/Transactions/WalletTransactions"
import BankTransactions from "pages/Transactions/BankTransactions"
import SuccesfulTransactions from "pages/Transactions/SuccesfulTransactions"
import PendingTransactions from "pages/Transactions/PendingTransactions"
import SuccessfulRepayments from "pages/Repayments/SuccesfulRepayments"
import PendingRepayments from "pages/Repayments/PendingRepayment"
import FailedRepayments from "pages/Repayments/FailedRepayments"
import WebRepayments from "pages/Repayments/WebRepayments"
import MobileRepayments from "pages/Repayments/MobileRepayments"
import DeclinedRepayments from "pages/Repayments/DeclinedRepayments"
import AllLoans from "pages/Loans/AllLoans"
import PendingLoans from "pages/Loans/PendingLoans"
import AllCompanies from "pages/Companies/AllCompanies"
import PendingCompanies from "pages/Companies/PendingCompanies"
import ActivatedCompanies from "pages/Companies/ActivatedCompanies"
import LoginTwo from "pages/Authentication/LoginTwo"


const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // Users
  { path: "/all-users", component: AllUsers },
  { path: "/all-debtors", component: AllDebtors },

  // Loans
  { path: "/all-loans", component: AllLoans },
  { path: "/pending-loans", component: PendingLoans },
  { path: "/loan-range", component: LoanRange },

  // Transactions
  { path: "/all-transactions", component: AllTransactions },
  { path: "/credit-transactions", component: CreditTransactions },
  { path: "/debit-transactions", component: DebitTransactions },
  { path: "/wallet-transactions", component: WalletTransactions },
  { path: "/bank-transactions", component: BankTransactions },
  { path: "/pending-transactions", component: PendingTransactions },
  { path: "/successful-transactions", component: SuccesfulTransactions },

  // Repayments
  { path: "/successful-repayments", component: SuccessfulRepayments },
  { path: "/pending-repayments", component: PendingRepayments },
  { path: "/declined-repayments", component: DeclinedRepayments },
  { path: "/failed-repayments", component: FailedRepayments },
  { path: "/web-repayments", component: WebRepayments },
  { path: "/mobile-repayments", component: MobileRepayments },

  // Companies
  { path: "/all-companies", component: AllCompanies },
  { path: "/pending-companies", component: PendingCompanies },
  { path: "/activated-companies", component: ActivatedCompanies },

  // // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/login-two", component: LoginTwo}
]

export { userRoutes, authRoutes }
