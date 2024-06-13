import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="text"
                value={loginInfo.email}
                placeholder="Email"
                onChange={(e) => {
                  updateLoginInfo({ ...loginInfo, email: e.target.value });
                }}
              />
              <Form.Control
                type="password"
                value={loginInfo.password}
                placeholder="Password"
                onChange={(e) => {
                  updateLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Getting You In " : "Login"}
              </Button>
              {loginError?.error && (
                <Alert
                  variant="danger"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p style={{ textAlign: "center", margin: 0 }}>
                    {loginError?.message}
                  </p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
