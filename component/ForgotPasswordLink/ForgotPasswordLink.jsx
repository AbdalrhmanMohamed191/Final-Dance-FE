import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../apis/api';
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordLink = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
 

  async function handelForgotPassword(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: emailRef.current.value,
      };

      const response = await api.post('/api/v1/auth/forgot-password', data);

      console.log(response.data);

      toast.success("Password reset link has been sent to your email. Check your inbox 📩");
       
      // Reset the form
        emailRef.current.value = '';
    } catch (error) {
      console.error(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3 bg-light">
      <div
        className="bg-white shadow rounded p-4"
        style={{ maxWidth: "620px", width: "100%", borderRadius: "16px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          Forgot Password
        </h2>

        <p className="text-center mb-4">
          Enter your email address below to receive a password reset link.
        </p>

        <Form onSubmit={handelForgotPassword}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold fs-5">
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              ref={emailRef}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 py-2 fw-semibold rounded-pill"
            disabled={loading}
          >
            {loading ? "Sending..." : "Reset Password"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
