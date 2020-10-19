import Vue from "vue";

Vue.filter("datetime", (value) => {
  if (!value) return "(n/a)";

  value = new Date(value);
  const padValue = (value) => (parseInt(value, 10) < 10 ? `0${value}` : value);
  const day = value.getDate();
  const month = value.getMonth();
  const paddedDay = padValue(day);
  const paddedMonth = padValue(month);

  const year = value.getFullYear();
  const hours = value.getHours();
  const minutes = value.getMinutes();

  return `${paddedDay}/${paddedMonth}/${year} ${hours}:${minutes}`;
});
