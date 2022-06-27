import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../store";

function render(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    const queryClient = new QueryClient();

    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router history={history}>{children}</Router>
        </QueryClientProvider>
      </Provider>
    );
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    history,
  };
}

export { render };
