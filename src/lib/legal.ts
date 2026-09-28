// Content mirrored from https://www.crado.io/privacy and https://www.crado.io/terms.

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: { label?: string; text: string }[] };

export type LegalDoc = {
  title: string;
  lastUpdated: string;
  sections: { heading: string; blocks: Block[] }[];
};

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  lastUpdated: "28 September 2026",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        { type: "p", text: "This Privacy Policy explains how BloomX Analytica Limited (\"Crado\", \"we\", \"us\", or \"our\") collects, uses, and shares personal data when you visit our website or interact with our public pilot booking process." },
      ],
    },
    {
      heading: "2. Data Controller and Contact",
      blocks: [
        { type: "p", text: "BloomX Analytica Limited, a company incorporated in England and Wales (Company Number: 16439496), is the controller of your personal data." },
        { type: "p", text: "Registered office: 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ" },
        { type: "p", text: "Contact email: hello@crado.io" },
      ],
    },
    {
      heading: "3. Personal Data We Collect",
      blocks: [
        { type: "p", text: "When you use our public site, we collect the following categories of data:" },
        {
          type: "ul",
          items: [
            { label: "Contact Data", text: "Your email address and correspondence when you contact us via our mailto links." },
            { label: "Scheduling Data", text: "Name, email, and meeting preferences provided directly to Cal.com when you request a pilot." },
            { label: "Technical Data", text: "Basic network routing data (such as IP addresses) processed by our hosting provider (Vercel) to deliver the website." },
          ],
        },
        { type: "p", text: "This site currently operates as a static informational presentation. It does not include authentication, user accounts, database storage, file uploads, or payment processing." },
      ],
    },
    {
      heading: "4. Purposes and Lawful Basis",
      blocks: [
        { type: "p", text: "We process your data on the following lawful bases:" },
        {
          type: "ul",
          items: [
            { label: "To communicate with you", text: "Responding to emails. Lawful basis: Legitimate interests in operating our business and answering inquiries." },
            { label: "To schedule pilot demonstrations", text: "Facilitating meetings via Cal.com. Lawful basis: Legitimate interests in demonstrating our services, or steps taken at your request prior to entering a contract." },
            { label: "To deliver the website safely", text: "Serving site assets via our host. Lawful basis: Legitimate interests in maintaining network security and availability." },
          ],
        },
      ],
    },
    {
      heading: "5. Data Sharing and Processors",
      blocks: [
        { type: "p", text: "We share data with the following specific categories of service providers to operate this site:" },
        {
          type: "ul",
          items: [
            { label: "Hosting & Edge Delivery", text: "Vercel Inc. hosts this website and delivers it through its network." },
            { label: "Scheduling Integration", text: "Cal.com, Inc. operates the embedded calendar popup. The site loads Cal.com's embed script in the background so the calendar can open on the page; the calendar itself loads only when you open it. When you interact with the calendar, Cal.com acts as an independent processor of the scheduling data you submit." },
            { label: "Font Delivery", text: "We request Google Fonts to display our typography. Google may receive your IP address when delivering these font files." },
          ],
        },
        { type: "p", text: "We do not currently use analytics trackers or marketing subprocessors on this website." },
      ],
    },
    {
      heading: "6. Cookies and Storage",
      blocks: [
        { type: "p", text: "Crado does not deploy any non-essential cookies, trackers, or local storage mechanisms when you browse our landing page. Because we do not use tracking cookies, we do not interrupt your browsing with a consent banner." },
        { type: "p", text: "However, if you open the \"Request a Pilot\" scheduling popup, our partner Cal.com may set functional and security cookies required for their booking application to operate. We do not control these cookies. You can review Cal.com's own privacy and cookie practices on their website." },
      ],
    },
    {
      heading: "7. Data Retention",
      blocks: [
        { type: "p", text: "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected. Exact retention periods depend on ongoing legal review and operational requirements; generally, pilot inquiry correspondence is held while we evaluate a potential business relationship with your organization, and deleted thereafter if no relationship is formed." },
      ],
    },
    {
      heading: "8. Your Rights",
      blocks: [
        { type: "p", text: "Under data protection law (such as the UK GDPR), you possess rights including the right to access, rectify, or erase your personal data, and the right to object to or restrict processing." },
        { type: "p", text: "To exercise these rights, please contact us at hello@crado.io. You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) if you believe we are processing your data unlawfully." },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms and Conditions",
  lastUpdated: "4 September 2026",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        { type: "p", text: "These Terms of Service (\"Terms\") govern your access to and use of the website and pilot services provided by BloomX Analytica Limited (\"Crado\", \"we\", \"us\", or \"our\"), registered in England and Wales under company number 16439496. By accessing or using our services, you agree to be bound by these Terms. If you are accepting these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms." },
      ],
    },
    {
      heading: "2. Nature of the Service",
      blocks: [
        { type: "p", text: "Crado develops software to support engineering investigation and compliance evidence management. We are not a test laboratory, certification body, legal adviser, or EMC simulator, and our software does not guarantee regulatory compliance." },
        { type: "p", text: "Any hypotheses, test recommendations, or inferences generated by the Crado platform require qualified human engineering review. Actual physical measurements and authorized conformity-assessment processes by accredited bodies remain strictly required for market entry." },
      ],
    },
    {
      heading: "3. Pilot Access and Acceptable Use",
      blocks: [
        { type: "p", text: "Access to Crado's pilot services is currently granted on an invitation or application basis. If you participate in a pilot, you agree to use the service only for lawful purposes related to assessing hardware compliance workflows. You must not attempt to reverse engineer, decompile, bypass security controls, or otherwise interfere with the operation of the Crado platform." },
        { type: "p", text: "Note that the current public website is an informational landing page. It does not provide account authentication, file upload capabilities, or active pilot software." },
      ],
    },
    {
      heading: "4. Data and Intellectual Property",
      blocks: [
        { type: "p", text: "You retain all rights to any engineering files, schematics, and test data you upload to the Crado service during an active pilot. You grant Crado a limited license to process this data strictly for the purpose of providing the agreed pilot service to you." },
        { type: "p", text: "Crado retains all intellectual property rights in the platform, algorithms, interface design, and underlying methodologies. We will treat your engineering data as confidential and will not disclose it to third parties except as necessary to provide the service, utilizing agreed subprocessors, or as required by law." },
      ],
    },
    {
      heading: "5. Disclaimers and Limitations of Liability",
      blocks: [
        { type: "p", text: "The public website and any pilot services are provided \"as is\" and \"as available\" without warranties of any kind, whether express or implied. Crado explicitly disclaims any warranty of merchantability, fitness for a particular purpose, or non-infringement." },
        { type: "p", text: "To the maximum extent permitted by applicable law, Crado shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, or engineering data resulting from your reliance on or use of the service. Nothing in these Terms excludes liability for death or personal injury caused by negligence, or for fraud." },
      ],
    },
    {
      heading: "6. Governing Law",
      blocks: [
        { type: "p", text: "These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the English courts." },
      ],
    },
    {
      heading: "7. Changes to Terms",
      blocks: [
        { type: "p", text: "We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this site. Your continued use of the service constitutes acceptance of those changes. For legal or policy inquiries, please contact hello@crado.io." },
      ],
    },
  ],
};
