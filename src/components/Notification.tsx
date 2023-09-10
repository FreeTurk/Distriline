import { Notification, RingProgress } from "@mantine/core";

import { deleteNotification } from "@/lib/dispatchNotification";

interface Props {
  state: "error" | "alert" | "success";
  loading: boolean;
  body: string;
  title?: string;
  fading: boolean;
  id: number;
}

const NotificationProp: React.FC<Props> = (props) => {
  if (props.fading) setTimeout(() => deleteNotification(props.id), 10000);
  if (["error", "alert", "success"].includes(props.state))
    return (
      <div className="relative w-full z-40">
        <Notification
          color={props.state == "error" ? "red" : props.state == "alert" ? "orange" : "blue"}
          loading={props.loading}
          title={props.title}
          onClose={() => deleteNotification(props.id)}
          withBorder
          radius={"md"}
          className="relative">
          {props.body}
        </Notification>
      </div>
    );
  else
    return (
      <Notification
        className="shrink-0"
        title="Oops!"
        color="red"
        onClose={() => deleteNotification(props.id)}>
        Unexpected Error in the notification system, please ignore.
      </Notification>
    );
};

export default NotificationProp;
