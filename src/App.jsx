import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import AboutPage from "./pages/About/AboutPage"
import ContactPage from "./pages/Contact/ContactPage"
import FAQPage from "./pages/FAQ/FAQPage"
import SignupPage from "./pages/Signup/SignupPage"
import LoginPage from "./pages/Login/LoginPage"
import ProfilePage from "./pages/Profile/ProfilePage"
import CalendarViewPage from "./pages/CalendarView/CalendarViewPage"
import MeetingsPage from "./pages/Meetings/MeetingsPage"
import MeetingDetailsPage from "./pages/Meetings/MeetingDetailsPage.jsx"
import PollsPage from "./pages/Polls/PollsPage.jsx"


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element={<HomePage />}/>
          <Route path = "/about" element={<AboutPage />}/>
          <Route path = "/contact" element={<ContactPage />}/>
          <Route path = "/faq" element={<FAQPage />}/>
          <Route path = "/meetings" element={<MeetingsPage />}/>
          <Route path = "/signup" element={<SignupPage />}/>
          <Route path = "/login" element={<LoginPage />}/>
          <Route path = "/profile" element={<ProfilePage />}/>
          <Route path = "/calendar-view" element={<CalendarViewPage />}/>
          <Route path = "/meetings" element={<MeetingsPage />}/>
          <Route path = "/meetings/:id/edit" element={<MeetingDetailsPage />}/>
          <Route path = "/meetings/schedule" element={<MeetingDetailsPage />}/>
          <Route path = "/polls" element={<PollsPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
