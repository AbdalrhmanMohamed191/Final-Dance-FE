// import React, { useRef, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { errorHandler } from '../../utils/errorHandler';
// import api from '../../apis/api';

// export const ResetPassword = () => {
//     //  State 
//     const [Loading, setLoading] = useState(false);
//     // Refs
//     const newPasswordRef = useRef();
//     // navigate
//     const go = useNavigate();
//     // Token
//     const {token} = useParams();
//     // Functions
//     async function handleResetPassword(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//         const data = { token , newPassword: newPasswordRef.current.value };
//         // API Call
//         const response = await api.post('/api/v1/auth/reset-password', data);
//         toast.success(response.data.message);
//         go('/login');
        
//     } catch (error) {
//         console.log(error)
//         errorHandler(error);
//     }
//     finally {
//         setLoading(false);
//     }
//     }
//   return (
//     <div>ResetPassword</div>
//   )
// }



import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { errorHandler } from '../../utils/errorHandler';
import api from '../../apis/api';
import toast from 'react-hot-toast';

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const newPasswordRef = useRef();
  const go = useNavigate();
  const { token } = useParams();

  async function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { token, newPassword: newPasswordRef.current.value };
      const response = await api.post('/api/v1/auth/reset-password', data);
      toast.success(response.data.message);
      go('/login');
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5}>
          <Card className="shadow p-4 rounded-4">
            <Card.Body>
              <h2 className="mb-4 text-center text-primary fw-bold">Reset Password</h2>
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label className="fw-semibold">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your new password"
                    ref={newPasswordRef}
                    required
                    minLength={6}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 rounded-pill py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
