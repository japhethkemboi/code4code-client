export default function Careers() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 p-4 gap-6">
      <div className="flex flex-col gap-8 items-center self-center justify-center text-center grow w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-4">Careers</h1>
        <p className="text-lg text-center max-w-2xl">
          We don’t have any open positions at the moment. But we’re always excited to meet talented and ambitious
          individuals who share our passion for innovation and need to standout.
        </p>
        <p className="text-center text-gray-700">
          Feel free to check back later or send us your CV and tell us about yourself for future opportunities at{" "}
          <a href="mailto:careers@code4code.dev" className="text-indigo-600 underline">
            careers@code4code.dev
          </a>
          .
        </p>
      </div>
    </div>
  );
}
