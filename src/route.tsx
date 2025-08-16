import BillingManager from "./pages/billingmanager/Index"
import DailyStatusReport from "./pages/dailystatusreport/Index"
import OracleUpload from "./pages/oracleupload/Index"
import Settings from "./pages/settings/Index"
import Timesheet from "./pages/timesheet/Index"

const baseUrl = "/agos";

const routes = [
  {
    path: baseUrl,
    element: <Timesheet />,
  },
  {
    path: `${baseUrl}/oracleupload`,
    element: <OracleUpload />,
  },
  // {
  //     path: "timetracking",
  //     element: <Timesheet />,
  // },
  {
    path: `${baseUrl}/billingmanager`,
    element: <BillingManager />,
  },
  {
    path: `${baseUrl}/settings`,
    element: <Settings />,
  },
  {
    path: `${baseUrl}/dailystatusreport`,
    element: <DailyStatusReport />,
  },
]
export default routes
