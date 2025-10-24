export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-3 mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} MyLMS — All rights reserved.
      </p>
    </footer>
  );
}
