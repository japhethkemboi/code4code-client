export default function TermsOfService() {
  return (
    <div className="flex pt-24 flex-col items-center min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
      <div className="max-w-4xl text-gray-700 space-y-6 text-lg">
        <p>
          Welcome to CODE4CODE. By accessing or using our services, you agree to
          comply with and be bound by the following Terms of Service.
        </p>
        <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
        <p>
          By accessing our website or using our services, you acknowledge that
          you have read, understood, and agreed to these terms.
        </p>
        <h2 className="text-2xl font-bold">2. Intellectual Property</h2>
        <p>
          All content on this site, including text, graphics, logos, and
          software, is the property of CODE4CODE. Unauthorized use is
          prohibited.
        </p>
        <h2 className="text-2xl font-bold">3. Limitation of Liability</h2>
        <p>
          CODE4CODE is not liable for any indirect, incidental, or consequential
          damages arising from the use of our services.
        </p>
        <h2 className="text-2xl font-bold">4. Amendments</h2>
        <p>
          We reserve the right to update these terms at any time without prior
          notice. Continued use of our services constitutes acceptance of these
          changes.
        </p>
        <p>
          For questions, contact us at
          <a
            href="mailto:support@code4code.dev"
            className="text-indigo-600 underline"
          >
            {" "}
            support@code4code.dev
          </a>
          .
        </p>
      </div>
    </div>
  );
}
