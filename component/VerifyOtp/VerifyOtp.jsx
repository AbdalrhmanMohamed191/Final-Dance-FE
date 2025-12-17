// // import React from 'react'

// // export const VerifyOtp = () => {
// //   return (
// //     <div>VerifyOtp</div>
// //   )
// // }


// import React, { useRef, useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
// import toast from "react-hot-toast";
// import api from "../../apis/api";
// import { useNavigate } from "react-router-dom";
// import { Loading } from "../../component/Loading/Loading";
// import { errorHandler } from "../../utils/errorHandler";

// export const VerifyOtp = () => {
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(0); // 60 ثانية مؤقت
//   const otpRef = useRef();
//   const navigate = useNavigate();

//   // بدء العد التنازلي عند تحميل المكون
//   useEffect(() => {
//     if (timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);

//   async function handleVerifyOtp(e) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//         const email = localStorage.getItem("email");
//         if (!email) {
//             toast.error("Email not found. Please register again.");
//             setLoading(false);
//             return;
//         }
//       const data = {
//         otp: otpRef.current.value,
//         email: email,
//       };

//       const response = await api.post("/api/v1/auth/verify-otp", data);
//       toast.success(response.data.message);
//       navigate("/Home");
//     } catch (error) {
//       errorHandler(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleResendOtp() {
//     setResendLoading(false);

//     try {
      
//       const email = localStorage.getItem("email");
//       if (!email) {
//         toast.error("Email not found. Please register again.");
//         setResendLoading(true);
//         return;
//       }
//       await api.post("/api/v1/auth/resend-otp", { email });
//       toast.success("OTP resent successfully!");
//       setTimer(60); // إعادة ضبط المؤقت
//     } catch (error) {
//       errorHandler(error);
//     } finally {
//       setResendLoading(false);
//     }
//   }

//   if (loading) return <Loading />;

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card style={{ maxWidth: 400, width: "100%" }} className="p-4 shadow">
//         <h3 className="text-center mb-4">Verify Your OTP</h3>

//         <Form onSubmit={handleVerifyOtp}>
//           <Form.Group className="mb-3" controlId="otp">
//             <Form.Control
//               type="text"
//               placeholder="Enter OTP"
//               maxLength={6}
//               ref={otpRef}
//               required
//               className="text-center fs-4"
//               style={{ letterSpacing: "0.5em" }}
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             type="submit"
//             className="w-100 rounded-pill py-2 fw-semibold mb-3"
//             disabled={loading}
//           >
//             Verify
//           </Button>
//         </Form>

//         <Button
//           variant="outline-secondary"
//           className="w-100 rounded-pill"
//           onClick={handleResendOtp}
//           disabled={timer > 0 || resendLoading}
//         >
//           {timer > 0 ? `Resend OTP in ${timer}s` : resendLoading ? "Sending..." : "Resend OTP"}
//         </Button>
//       </Card>
//     </Container>
//   );
// };


import React, { useRef, useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import api from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../component/Loading/Loading";
import { errorHandler } from "../../utils/errorHandler";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";

export const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const otpRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Timer is now:", timer);
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const email = localStorage.getItem("email");
      if (!email) {
        toast.error("Email not found. Please register again.");
        setLoading(false);
        return;
      }
      const data = {
        otp: otpRef.current.value,
        email: email,
      };

      const response = await api.post("/api/v1/auth/verify-otp", data);
      toast.success(response.data.message);
        // 
        dispatch(setUser(response.data.user));

      // Save token to localStorage for OTP resend
        localStorage.setItem("token", response.data.token);
        navigate("/");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
  setResendLoading(true);

  try {
    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Email not found. Please register again.");
      setResendLoading(false);
      return;
    }

    // إرسال الإيميل مع الطلب
    const response = await api.post("/api/v1/auth/resend-otp", { email });
    console.log(response);

    // إشعار المستخدم بنجاح الإرسال
    toast.success(`OTP resent successfully to ${email}!`);

    // إعادة ضبط المؤقت
    setTimer(60);async function handleResendOtp() {
  setResendLoading(true);

  try {
    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Email not found. Please register again.");
      setResendLoading(false);
      return;
    }

    // إرسال الإيميل مع الطلب
    const response = await api.post("/api/v1/auth/resend-otp", { email });

    console.log(response);

    // إشعار المستخدم بنجاح الإرسال
    toast.success(`OTP resent successfully to ${email}!`);

    // إعادة ضبط المؤقت
    setTimer(60);
    console.log("Timer set to 60 seconds");
  } catch (error) {
    errorHandler(error);
  } finally {
    setResendLoading(false);
  }
}

    console.log("Timer set to 60 seconds");
  } catch (error) {
    errorHandler(error);
  } finally {
    setResendLoading(false);
  }
}


  if (loading) return <Loading />;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ maxWidth: 400, width: "100%" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Verify Your OTP</h3>

        <Form onSubmit={handleVerifyOtp}>
          <Form.Group className="mb-3" controlId="otp">
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              ref={otpRef}
              required
              className="text-center fs-4"
              style={{ letterSpacing: "0.5em" }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill py-2 fw-semibold mb-3"
            disabled={loading}
          >
            Verify
          </Button>
        </Form>

        <Button
          variant="outline-secondary"
          className="w-100 rounded-pill"
          onClick={handleResendOtp}
          disabled={timer > 0 || resendLoading}
        >
          {timer > 0
            ? `Resend OTP in ${timer}s`
            : resendLoading
            ? "Sending..."
            : "Resend OTP"}
        </Button>
      </Card>
    </Container>
  );
};
