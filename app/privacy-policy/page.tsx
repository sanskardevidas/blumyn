export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB] py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold text-[#7A5C9E]">
          Privacy Policy
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Introduction
            </h2>
            <p>
              Blumyn values your privacy and is committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, store, and safeguard your information when you use our
              website and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Information We Collect
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Shipping Address</li>
              <li>Order Information</li>
              <li>Payment Information (processed securely by payment providers)</li>
              <li>Device and Browser Information</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              How We Use Your Information
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>To process and fulfill orders.</li>
              <li>To provide customer support.</li>
              <li>To send order and delivery updates.</li>
              <li>To improve our products and services.</li>
              <li>To prevent fraud and unauthorized activities.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Payment Security
            </h2>

            <p>
              All online payments are processed through secure third-party
              payment gateways. Blumyn does not store your complete debit card,
              credit card, UPI PIN, or banking credentials on our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Data Security
            </h2>

            <p>
              We implement industry-standard security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Third-Party Services
            </h2>

            <p>
              We may use trusted third-party providers for payment processing,
              analytics, delivery services, and customer support. These
              providers have access only to information necessary to perform
              their services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Cookies
            </h2>

            <p>
              Our website may use cookies and similar technologies to enhance
              user experience, analyze website traffic, and improve services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Your Rights
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Access your personal information.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of promotional communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#7A5C9E]">
              Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us:
            </p>

            <div className="mt-4 rounded-2xl border border-[#E8DDF3] bg-white p-6">
              <p>
                <strong>Blumyn</strong>
              </p>
              <p>Email: contact@blumyn.shop</p>
              <p>Phone: +91 8766589805</p>
              <p>Website: https://www.blumyn.shop</p>
              <p>Address : 101-Aai Height, Pargaon, Tarfe Ale, Junnar, Pune, Maharashtra – 410504, India</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}