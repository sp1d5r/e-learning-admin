import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../cloud-infrastructure/auth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Getting Sign In method from Auth Context
    const { signIn } = useAuth();

    const failedCallback = (error_code, error_message) => {
        setError(`Failed to Login - ${error_message}`);
        console.log(error_code, error_message);
    };

    const successfulCallback = () => {
        navigate("/");
    };

    const trySignIn = () => {
        signIn(email, password, successfulCallback, failedCallback);
    };

    return (
        <>
            <Container style={{"paddingTop": "10%"}}>
                <Form>
                    <h1>Login</h1>
                    {error !== "" ? (
                        <Alert variant={"danger"} className={"danger-alert"}>
                            {error}
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                if (e.target.value !== "") {
                                    setEmail(e.target.value);
                                }
                            }}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                trySignIn();
                            }}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Login;