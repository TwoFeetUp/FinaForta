import CTASection from "../CTASection";

export default function CTASectionExample() {
  return (
    <CTASection
      onEmailSubmit={(email) => console.log("Email summary requested:", email)}
      onEbookDownload={(email) => console.log("E-book download:", email)}
      onQuoteRequest={(data) => console.log("Quote requested:", data)}
      onScheduleAppointment={() => console.log("Schedule appointment clicked")}
    />
  );
}
