export default function ReturnPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-8">Return Policy</h1>

      <p>
        At Blumyn, due to the hygienic nature of our products, opened or used
        products cannot be returned.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Eligible Return Cases
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Wrong product delivered</li>
        <li>Damaged product received</li>
        <li>Missing item in package</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Return Request Timeline
      </h2>

      <p>
        Return requests must be raised within 48 hours of delivery with
        supporting photos.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Contact Us
      </h2>

      <p>Email: contact@blumyn.shop</p>
      <p>Phone: +91 8766589805</p>
    </main>
  );
}