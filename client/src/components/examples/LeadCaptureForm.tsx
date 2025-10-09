import LeadCaptureForm from "../LeadCaptureForm";

export default function LeadCaptureFormExample() {
  return (
    <LeadCaptureForm
      onSubmit={(data) => console.log("Lead submitted:", data)}
      showPhone={true}
    />
  );
}
