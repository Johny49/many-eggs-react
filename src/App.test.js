import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

test("renders the app header", () => {
  render(
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByRole("heading", { name: /many eggs, one basket/i })
  ).toBeInTheDocument();
});
