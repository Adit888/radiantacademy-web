import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
}

export default MainLayout;
