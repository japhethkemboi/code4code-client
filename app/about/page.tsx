export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
      <p className="text-lg text-center max-w-3xl">
        At CODE4CODE, we don’t just write code – we craft solutions that elevate businesses. Our mission is to empower
        organizations with custom software, elegant designs, and seamless integrations.
      </p>
      <p className="mt-6 text-center max-w-3xl text-gray-700">
        Founded in Kenya, CODE4CODE has grown into a dynamic team of forward-thinking professionals, passionate about
        building technology that transforms ideas into impactful results. Whether you’re a startup or an established
        business, we’re here to take you to the next level.
      </p>
      <p className="mt-6 text-gray-700 text-center">
        Contact us at{" "}
        <a href="mailto:contact@code4code.dev" className="text-indigo-600 underline">
          contact@code4code.dev
        </a>
        .
      </p>
    </div>
  );
}
