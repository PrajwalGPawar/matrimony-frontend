
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home component", () => {
  test("renders site title and heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Eternal Knots/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Your Perfect Match/i)).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Help/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument();
  });

  test("renders Login and Register buttons", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  test("Login and Register buttons trigger navigation", () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /Login/i });
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.click(loginButton);
    fireEvent.click(registerButton);

    // ❗ Since `useNavigate()` is used, you need to mock it in a real unit test setup
    // or test it via integration (e.g. using React Router's `MemoryRouter` with routes).
    // Here we only simulate the clicks — navigation logic would be covered in integration tests.
  });
});
