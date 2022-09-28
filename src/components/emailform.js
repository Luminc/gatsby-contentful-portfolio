import { navigate } from "gatsby";
import React from "react";
import { Container } from "react-bootstrap";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export const EmailForm = () => {
  const [state, setState] = React.useState({});

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => alert("Success! Thank you."))
      .catch(error => alert(error));
  };
  return (
    <Container size="xl" className="hero-flight mt-5">
      <Container className="text-center container-email-form pt-5">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="my-auto py-5"
          onSubmit={handleSubmit}
        >
          <h2 className="h2 pb-3">Subscribe below to receive updates</h2>
          <p className="pb-3">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="input"
              onChange={handleChange}
            />
          </p>
          <p>
            <button type="submit" className="shape-pill large-button">
              Send
            </button>
          </p>
        </form>
      </Container>
    </Container>
  );
};
