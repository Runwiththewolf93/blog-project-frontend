/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, act, waitFor } from "@testing-library/react";
import ToastComponent from "./Toast";

describe("ToastComponent_function", () => {
  // Tests that the Toast component is rendered with the correct message
  it("test_render_toast_with_correct_message", () => {
    const locationIpAddress = "192.168.1.1";
    const locationIsVpn = true;

    render(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    const toastMessage = screen.getByText(
      new RegExp(
        `Your location IP address is ${locationIpAddress}, and you are using a VPN.`
      )
    );

    expect(toastMessage).toBeInTheDocument();
  });

  // Tests that the Toast component is closed after 10 seconds
  it("test_close_toast_after_10_seconds", async () => {
    jest.useFakeTimers();
    const locationIpAddress = "192.168.1.1";
    const locationIsVpn = true;

    render(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      const toast = screen.queryByText(
        new RegExp(
          `Your location IP address is ${locationIpAddress}, and you are using a VPN.`
        )
      );
      expect(toast).not.toBeInTheDocument();
    });
  });

  // Tests that a Spinner component is rendered if locationIpAddress is falsy
  it("test_render_spinner_if_location_ip_address_is_falsy", () => {
    const locationIpAddress = "";
    const locationIsVpn = true;

    const { container } = render(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    const spinner = container.querySelector(".spinner-border");

    expect(spinner).toBeInTheDocument();
  });

  // Tests that the correct message is rendered if locationIsVpn is falsy
  it("test_render_correct_message_if_location_is_vpn_is_falsy", async () => {
    jest.useFakeTimers();
    const locationIpAddress = "192.168.1.1";
    const locationIsVpn = false;

    render(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      const toast = screen.queryByText(
        new RegExp(
          `Your location IP address is ${locationIpAddress}, and you are not using a VPN. Purchase our VPN today!`
        )
      );
      expect(toast).toBeInTheDocument();
    });
  });

  // Tests that the correct message is rendered if locationIsVpn is truthy
  it("test_render_correct_message_if_location_is_vpn_is_truthy", async () => {
    jest.useFakeTimers();
    const locationIpAddress = "192.168.1.1";
    const locationIsVpn = true;

    render(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      const toast = screen.queryByText(
        new RegExp(
          `Your location IP address is ${locationIpAddress}, and you are using a VPN.`
        )
      );
      expect(toast).toBeInTheDocument();
    });
  });

  // Tests that the useEffect hook is used to close the Toast component
  it("test_use_effect_hook", async () => {
    jest.useFakeTimers();
    const locationIpAddress = "192.168.1.1";
    const locationIsVpn = true;

    const { rerender } = render(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    jest.advanceTimersByTime(5000);

    rerender(
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
    );

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      const toast = screen.queryByText(
        new RegExp(
          `Your location IP address is ${locationIpAddress}, and you are using a VPN.`
        )
      );
      expect(toast).not.toBeInTheDocument();
    });
  });
});
