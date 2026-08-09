import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { activateSubscription } from "../utils/subscription";

const PaymentCallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.endsWith("/success")) {
      activateSubscription();
      navigate("/subscribe/complete", { replace: true });
      return;
    }

    if (location.pathname.endsWith("/cancel")) {
      navigate("/subscribe?toast=canceled", { replace: true });
      return;
    }

    if (location.pathname.endsWith("/fail")) {
      navigate("/subscribe?toast=failed", { replace: true });
      return;
    }

    navigate("/subscribe", { replace: true });
  }, [location.pathname, navigate]);

  return null;
};

export default PaymentCallbackPage;
