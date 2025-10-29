import CTASection from "../CTASection";

export default function CTASectionExample() {
  return (
    <CTASection
      onEbookDownload={() => console.log("E-book download requested")}
      onQuoteRequest={() => console.log("Quote requested")}
      onScheduleAppointment={() => console.log("Schedule appointment clicked")}
    />
  );
}
