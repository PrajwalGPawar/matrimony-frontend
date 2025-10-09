// router.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

// ✅ Mock router
jest.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
}));

function DummyComponent() {
  return <div>Hello from test</div>;
}

test('renders without crashing', () => {
  render(<DummyComponent />);
  expect(screen.getByText(/Hello from test/i)).toBeInTheDocument();
});
