import { useIntl } from "react-intl";

const timeAgo = (timestamp) => {
  const intl = useIntl();
  const now = new Date();
  const timeDifference = now - new Date(timestamp);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const labelDayAgo = intl.formatMessage({
    id: "timeAgo.dayago",
    defaultMessage: "1 day ago",
  });
  const labelDaysAgo = intl.formatMessage({
    id: "timeAgo.daysago",
    defaultMessage: "days ago",
  });
  const labelHourAgo = intl.formatMessage({
    id: "timeAgo.hourago",
    defaultMessage: "1 hour ago",
  });
  const labelHoursAgo = intl.formatMessage({
    id: "timeAgo.hoursago",
    defaultMessage: "hours ago",
  });
  const labelMinAgo = intl.formatMessage({
    id: "timeAgo.minago",
    defaultMessage: "1 min ago",
  });
  const labelMinsAgo = intl.formatMessage({
    id: "timeAgo.minsago",
    defaultMessage: "mins ago",
  });
  const labelSecAgo = intl.formatMessage({
    id: "timeAgo.secago",
    defaultMessage: "1 sec ago",
  });
  const labelSecsAgo = intl.formatMessage({
    id: "timeAgo.secsago",
    defaultMessage: "secs ago",
  });
  const labelJustNow = intl.formatMessage({
    id: "timeAgo.justnow",
    defaultMessage: "Just Now",
  });

  if (days > 0) {
    return days === 1 ? labelDayAgo : `${days} ${labelDaysAgo}`;
  } else if (hours > 0) {
    return hours === 1 ? labelHourAgo : `${hours} ${labelHoursAgo}`;
  } else if (minutes > 0) {
    return minutes === 1 ? labelMinAgo : `${minutes} ${labelMinsAgo}`;
  } else {
    return seconds === 0
      ? labelJustNow
      : seconds === 1
        ? labelSecAgo
        : `${seconds} ${labelSecsAgo}`;
  }
};

export default timeAgo;
