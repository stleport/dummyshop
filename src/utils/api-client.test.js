import { rest } from "msw";
import { client } from "./api-client";
import { setupServer } from "msw/node";

const apiUrl = process.env.REACT_APP_API_URL;

const products = [];
const server = setupServer(
  rest.get(`${apiUrl}/products`, (req, res, ctx) => {
    return res(ctx.json({ products }));
  })
);

jest.mock("react-query");

test.skip("calls fetch at the endpoint with the arguments for GET requests", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await client(endpoint);

  expect(result).toEqual(mockResult);
});

test.skip("allows for config overrides", async () => {
  let request;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  const customConfig = {
    mode: "cors",
    headers: { "Content-Type": "fake-type" },
  };

  await client(endpoint, customConfig);

  expect(request.mode).toBe(customConfig.mode);
  expect(request.headers.get("Content-Type")).toBe(
    customConfig.headers["Content-Type"]
  );
});

test.skip("when data is provided, it is stringified and the method defaults to POST", async () => {
  const endpoint = "test-endpoint";
  server.use(
    rest.post(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );
  const data = { a: "b" };
  const result = await client(endpoint, { data });

  expect(result).toEqual(data);
});

test.skip(`correctly rejects the promise if there's an error`, async () => {
  const testError = { message: "Test error" };
  const endpoint = "test-endpoint";
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError));
    })
  );

  const error = await client(endpoint).catch((e) => e);

  expect(error).toEqual(testError);
});
