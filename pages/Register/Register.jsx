import { useRef, useState } from "react";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import toast from "react-hot-toast";
import { Loading } from "../../component/Loading/Loading";
import { errorHandler } from "../../utils/errorHandler";


export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Refs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
 

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await api.post("/api/v1/auth/register", data);
      toast.success(response.data.message);
      // Save email to localStorage for OTP resend
      localStorage.setItem("email", data.email);
      // Optionally, redirect to another page, e.g., login or email verification
      navigate("/verify-otp");

    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <Container className="py-5">
      <Row className="shadow rounded overflow-hidden">

        {/* LEFT SIDE */}
        <Col
          md={5}
          className="bg-primary text-white d-flex flex-column justify-content-center align-items-center p-5"
        >
          <h2 className="mb-3 fw-bold">Welcome!</h2>
          <p className="mb-4 fs-5 text-center">
            Create your new account and join our platform now.
          </p>
          <Button
            variant="outline-light"
            className="rounded-pill px-4"
            onClick={() => navigate("/login")}
          >
            SIGN IN
          </Button>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={7} className="bg-white p-5">
          <h2 className="mb-4 text-center fw-bold">Create Account</h2>

          <Form onSubmit={handleRegister}>
            {/* Username */}
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>👤</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  ref={usernameRef}
                />
              </InputGroup>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>📧</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  ref={emailRef}
                />
              </InputGroup>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>🔒</InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: "56px",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 rounded-pill py-2 fw-semibold"
            >
              REGISTER
            </Button>
          </Form>

          <p className="text-center mt-4 mb-3 text-muted fw-semibold">
            Or Sign up using
          </p>

          <div className="d-flex justify-content-center gap-4 fs-4 text-muted">
            <FaFacebook className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaGoogle className="social-icon" />
            <FaLinkedin className="social-icon" />
          </div>
        </Col>
      </Row>

      <style>{`
        .social-icon {
          cursor: pointer;
          transition: color 0.3s;
        }
        .social-icon:hover {
          color: #0d6efd;
        }
      `}</style>
    </Container>
  );
}
