export type CheckShot = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  caption: string;
  /** Short line used where the screenshot also appears outside the walkthrough. */
  preview?: string;
  featured?: boolean;
};

export const CHECK_SHOTS: readonly CheckShot[] = [
  {
    id: "01",
    src: "/check/01-dashboard.webp",
    width: 657,
    height: 852,
    title: "Dashboard",
    alt: "Simpli Check dashboard showing active work orders, scheduling gaps, and this month's finances.",
    caption: "See active work orders, scheduling gaps, and finances at a glance.",
  },
  {
    id: "02",
    src: "/check/02-work-order.webp",
    width: 977,
    height: 797,
    title: "Work order",
    alt: "Simpli Check work order with confirmation and agreement, the inspection schedule, invoices, and client and property details.",
    caption:
      "Confirmation and agreement, schedule, inspector, invoices, and the client and property in one place.",
  },
  {
    id: "03",
    src: "/check/03-report-writer.webp",
    width: 967,
    height: 871,
    title: "Report Writer",
    alt: "Simpli Check Report Writer with system chips and saved selections for a roofing section.",
    caption: "Tap chips to build each system section. Selections save immediately.",
  },
  {
    id: "04",
    src: "/check/04-location-priority.webp",
    width: 1046,
    height: 847,
    title: "Location and priority",
    alt: "Location and priority choices for a finding, including location, recommended action, timeframe, and severity.",
    caption: "Set location, recommended action, timeframe, and severity with taps.",
  },
  {
    id: "05",
    src: "/check/05-notes.webp",
    width: 910,
    height: 520,
    title: "Your notes",
    alt: "A finding in Report Writer with a place to type your own observation notes.",
    caption: "Type your own notes if you want.",
  },
  {
    id: "06",
    src: "/check/06-get-narrative.webp",
    width: 980,
    height: 847,
    title: "Get Narrative",
    alt: "Get Narrative review with Assisted Draft selected and a Simpli-generated narrative ready to edit or save to your library.",
    caption:
      "Get Narrative pulls from your approved narrative library first. If you don't have one for that finding yet, Simpli Assist drafts one for you to edit or approve. Save it as your default and it joins your approved library for next time. You always review before anything is saved.",
    preview:
      "No typing required. Get Narrative starts with your approved library, and you review it before it is saved.",
    featured: true,
  },
  {
    id: "07",
    src: "/check/07-narrative-added.webp",
    width: 996,
    height: 532,
    title: "Narrative added",
    alt: "A finding in Report Writer after the narrative was added to the notes.",
    caption: "The narrative is added to the finding.",
  },
  {
    id: "08",
    src: "/check/08-photo-tools.webp",
    width: 822,
    height: 752,
    title: "Photo tools",
    alt: "Photo workspace with rotate, crop, arrow, circle, and caption tools. The original photo is kept.",
    caption:
      "Add and mark up photos: rotate, crop, arrows, circles, and captions. The original photo is always kept.",
  },
  {
    id: "09",
    src: "/check/09-preview.webp",
    width: 855,
    height: 832,
    title: "Preview and publish",
    alt: "Final report preview in Simpli Check, with the step to publish the inspection report.",
    caption: "Preview your final report and publish.",
  },
  {
    id: "10",
    src: "/check/10-pdf.webp",
    width: 962,
    height: 802,
    title: "PDF report",
    alt: "A page of a Simpli Check inspection report showing roofing description, limitations, and actions.",
    caption: "Download the PDF report.",
  },
  {
    id: "11",
    src: "/check/11-html-report.webp",
    width: 937,
    height: 600,
    title: "HTML report",
    alt: "Client-ready HTML inspection report with the cover photo and the inspection report header.",
    caption: "A client-ready HTML report.",
  },
];

export function checkShot(id: string): CheckShot {
  const shot = CHECK_SHOTS.find((item) => item.id === id);
  if (!shot) throw new Error(`Missing Simpli Check screenshot ${id}`);
  return shot;
}
