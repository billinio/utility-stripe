import { store } from "react-notifications-component";

const container = "bottom-right";
const animationIn = ["animate__animated", "animate__fadeIn"];
const animationOut = ["animate__animated", "animate__fadeOut"];
const duration = 4000;

export const Alert = {
  info(message: string | undefined, title?: string) {
    return store.addNotification({
      title,
      message,
      type: "success",
      container,
      animationIn,
      animationOut,
      dismiss: { duration },
    });
  },
  error(message: string | undefined, title?: string) {
    return store.addNotification({
      title,
      message,
      type: "danger",
      container,
      animationIn,
      animationOut,
      dismiss: { duration },
    });
  },
};
