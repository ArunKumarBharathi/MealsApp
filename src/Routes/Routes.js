import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Cart from "../Components/Cart/Cart";
import Order from "../Components/Order/Order";
import { OrderForm } from "../Components/UI/Form/OrderForm";
import { Success } from "../Components/UI/Notification/Success";
import Error from "../Components/UI/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/orders",
        element: <Order />,
      },
      {
        path: "order-status",
        element: <Success />,
      },
      {
        path: "/cart",
        element: <Cart />,
        children: [
          {
            path: "form",
            element: <OrderForm />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
