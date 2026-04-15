import Header from "@/component/layout.component/header.component";
import { Footer } from "@/component/layout.component/footer.component";
import Sidebar from "@/component/layout.component/sidebar.component";
import ProfileProvider from "@/component/profile.component";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex flex-1">
          <aside className="md:w-65 md:shrink-0">
            <Sidebar />
          </aside>

          <main className="min-w-0 flex-1 overflow-hidden bg-white px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
            {children}
          </main>
        </div>

        <Footer />
      </div>
    </ProfileProvider>
  );
}