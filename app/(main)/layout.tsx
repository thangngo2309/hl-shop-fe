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
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <ProfileProvider>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <aside className="overflow-y-auto md:w-65 md:shrink-0 bg-white border-r">
            <Sidebar />
          </aside>
          <main className="overflow-y-auto flex-1 min-w-0 bg-white px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
            {children}
          </main>
        </div>
        <Footer />
      </ProfileProvider>
    </div>
  );
}