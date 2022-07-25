import "./CheckInPage.css";

const today = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function CheckInPage() {
  return (
    <div>
      <h1>Check In</h1>
      <p>All info as of {today}</p>
    </div>
  );
}
