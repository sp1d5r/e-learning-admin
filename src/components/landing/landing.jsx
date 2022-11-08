import Alert from 'react-bootstrap/Alert';
import "./landing.css";

function Landing() {
    return (
        <div className={"container-main"}>
            <Alert key={"success"} variant={"success"}>
                Admin panel set up!
            </Alert>

            <div className={"divider"}>
                <p className={"divider-text"}>
                    Courses
                </p>
                <div/>
            </div>
        </div>
    )
}

export default Landing;