// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Aboutus from "./Componets/Aboutus";
// import Faq from "./Componets/Faq";
// import LoginPages from "./pages/LoginPages";
// import SignupPages from "./pages/SignupPages";
// import ApplyNowpage from "./pages/ApplyNowpage";
// import LeanerNavbar from "./Componets/LeanerNavbar";
// import TutorNavbar from "./Componets/TutorNavbar";

// // Learner Pages
// import LeanerDashboard from "./pages/Leanerpages/LeanerDashboard";
// import OneOnOne from "./pages/Leanerpages/OneOnOne";
// import TutorDetails from "./Componets/TutorDetails";
// import Group4 from "./pages/Leanerpages/Group4";
// import Group4plus from "./pages/Leanerpages/Group4plus";
// import LearnerQuestions from "./pages/Leanerpages/LearnerQuestions";
// import AskQuestion from "./pages/Leanerpages/AskQuestion";
// import Contact from "./pages/Leanerpages/Contact";
// import Review from "./pages/Leanerpages/Review";
// import Writereview from "./Componets/Writereview";
// import LeanerProfile from "./pages/Leanerpages/LeanerProfile";
// import Leanerprofileadd from "./pages/Leanerpages/Leanerprofileadd";

// // Tutor Pages
// import TutorProfile from "./pages/Tutorpages/TutorProfile";
// import TutorAddProfile from "./pages/Tutorpages/TutorAddProfile";
// import Paymentmethod from "./Componets/Paymentmethod";
// import WhiteBoard from "./Componets/WhiteBoard";
// import CalanderTimeSelect from "./Componets/CalanderTimeSelect";
// import Aboutpage from "./pages/Aboutpage";

// function App() {
//   const token = localStorage.getItem("token"); 
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/aboutpage" element={<Aboutpage />} />
//         <Route path="/aboutus" element={<Aboutus />} />
//         <Route path="/faq" element={<Faq />} />
//         <Route path="/loginpage" element={<LoginPages />} />
//         <Route path="/signuppages" element={<SignupPages />} />
//         <Route path="/applynow" element={<ApplyNowpage />} />

//         {/* Learner Routes */}
//         <Route
//           path="/leanernavbar"
//           element={ <LeanerNavbar /> }>
//           <Route index element={<OneOnOne />} />
//           <Route
//             path="dashboard"
//             element={token ? <LeanerDashboard /> : <Navigate to="/loginpage" />}
//           />
//           <Route path="oneonone" element={<OneOnOne />} />
//           <Route path="oneonone/tutordetails/:id" element={<TutorDetails />} />
//           <Route
//             path="group4"
//             element={token ? <Group4 /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="group4plus"
//             element={token ? <Group4plus /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="leanerquestions"
//             element={
//               token ? <LearnerQuestions /> : <Navigate to="/loginpage" />
//             }
//           />
//           <Route path="askquestion" element={<AskQuestion />} />
//           <Route
//             path="contact"
//             element={token ? <Contact /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="review"
//             element={token ? <Review /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="review/writereview"
//             element={token ? <Writereview /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="leanerprofile"
//             element={token ? <LeanerProfile /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="leanerprofile/leanerprofileadd"
//             element={
//               token ? <Leanerprofileadd /> : <Navigate to="/loginpage" />
//             }
//           />
//           <Route
//             path="paymentmethod"
//             element={token ? <Paymentmethod /> : <Navigate to="/loginpage" />}
//           />
//           <Route path="whiteboard" element={<WhiteBoard />} />
//         </Route>

//         {/* Tutor Routes */}
//         <Route
//           path="/tutornavbar"
//           element={token ? <TutorNavbar /> : <Navigate to="/loginpage" />}>
//           <Route index element={<LeanerDashboard />} />
//           <Route
//             path="dashboard"
//             element={token ? <LeanerDashboard /> : <Navigate to="/loginpage" />}
//           />
//           <Route path="oneonone" element={<OneOnOne />} />
//           <Route path="oneonone/tutordetails/:id" element={<TutorDetails />} />
//           <Route path="group4" element={<Group4 />} />
//           <Route path="group4plus" element={<Group4plus />} />
//           <Route
//             path="leanerquestions"
//             element={
//               token ? <LearnerQuestions /> : <Navigate to="/loginpage" />
//             }
//           />
//           <Route path="askquestion" element={<AskQuestion />} />
//           <Route
//             path="contact"
//             element={token ? <Contact /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="review"
//             element={token ? <Review /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="tutorprofile"
//             element={token ? <TutorProfile /> : <Navigate to="/loginpage" />}
//           />
//           <Route
//             path="tutorprofile/tutoraddprofile"
//             element={token ? <TutorAddProfile /> : <Navigate to="/loginpage" />}
//           />
//           <Route path="paymentmethod" element={<Paymentmethod />} />
//           <Route path="whiteboard" element={<WhiteBoard />} />
//           <Route
//             path="calandertimeselect"
//             element={
//               token ? <CalanderTimeSelect /> : <Navigate to="/loginpage" />
//             }
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Aboutus from "./Componets/Aboutus";
import Faq from "./Componets/Faq";
import LoginPages from "./pages/LoginPages";
import SignupPages from "./pages/SignupPages";
import ApplyNowpage from "./pages/ApplyNowpage";
import LeanerNavbar from "./Componets/LeanerNavbar";
import TutorNavbar from "./Componets/TutorNavbar";
import Paymentmethod from "./Componets/Paymentmethod";
import WhiteBoard from "./Componets/WhiteBoard";
import CalanderTimeSelect from "./Componets/CalanderTimeSelect";
import { Provider } from "react-redux";
import store from "./app/store";

// Importing Leaner pages
import LeanerDashboard from "./pages/Leanerpages/LeanerDashboard";
import OneOnOne from "./pages/Leanerpages/OneOnOne";
import TutorDetails from "./Componets/TutorDetails";
import Group4 from "./pages/Leanerpages/Group4";
import Group4plus from "./pages/Leanerpages/Group4plus";
import LearnerQuestions from "./pages/Leanerpages/LearnerQuestions";
import AskQuestion from "./pages/Leanerpages/AskQuestion";
import Contact from "./pages/Leanerpages/Contact";
import Review from "./pages/Leanerpages/Review";
import Writereview from "./Componets/Writereview";
import LeanerProfile from "./pages/Leanerpages/LeanerProfile";
import Leanerprofileadd from "./pages/Leanerpages/Leanerprofileadd";
import Aboutpage from "./pages/Aboutpage";
import TutorProfile from "./pages/Tutorpages/TutorProfile";
import TutorAddProfile from "./pages/Tutorpages/TutorAddProfile";
import TutorDashboard from "./pages/Tutorpages/TutorDashboard";
// import ForgotPassword from "./Componets/";
import TutorLeanerQuestion from "./pages/Tutorpages/TutorLeanerQuestion";

function App() {
  



  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutpage" element={<Aboutpage />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/loginpage" element={<LoginPages />} />
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}

          <Route path="/signuppages" element={<SignupPages />} />
          <Route path="/applynow" element={<ApplyNowpage />} />

          {/* Protected routes for Learner */}

          <Route path="/leanernavbar" element={<LeanerNavbar />}>
            <Route index element={<LeanerDashboard />} />
            <Route path="dashboard" element={<LeanerDashboard />} />
            <Route path="dashboard/paymentmethod" element={<Paymentmethod />} />
            <Route path="oneonone" element={<OneOnOne />} />
            <Route
              path="oneonone/tutordetails/:id"
              element={<TutorDetails />}
            />
            <Route path="group4" element={<Group4 />} />
            <Route path="group4/tutordetails/:id" element={<TutorDetails />} />
            <Route path="group4plus" element={<Group4plus />} />
            <Route
              path="group4plus/tutordetails/:id"
              element={<TutorDetails />}
            />
            <Route path="leanerquestions" element={<LearnerQuestions />} />
            <Route path="askquestion" element={<AskQuestion />} />
            <Route path="contact" element={<Contact />} />
            <Route path="review" element={<Review />} />
            <Route path="review/writereview" element={<Writereview />} />
            <Route path="leanerprofile" element={<LeanerProfile />} />
            <Route
              path="leanerprofile/leanerprofileadd"
              element={<Leanerprofileadd />}
            />
            <Route path="whiteboard" element={<WhiteBoard />} />
          </Route>

          {/* Protected routes for Tutor */}

          <Route path="/tutornavbar" element={<TutorNavbar />}>
            <Route index element={<TutorDashboard />} />
            <Route path="dashboard" element={<TutorDashboard />} />
            <Route path="dashboard/paymentmethod" element={<Paymentmethod />} />
           
            <Route
              path="tutorleanerquestion"
              element={<TutorLeanerQuestion />}
            />
            <Route path="askquestion" element={<AskQuestion />} />
            <Route path="contact" element={<Contact />} />
            <Route path="review" element={<Review />} />
            <Route path="review/writereview" element={<Writereview />} />
            <Route path="tutorprofile" element={<TutorProfile />} />
            <Route
              path="tutorprofile/tutoraddprofile"
              element={<TutorAddProfile />}
            />
            <Route path="paymentmethod" element={<Paymentmethod />} />
            <Route path="whiteboard" element={<WhiteBoard />} />
            <Route path="calandertimeselect" element={<CalanderTimeSelect />} />
          </Route>

          {/* Fallback for unauthenticated users */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App; 
