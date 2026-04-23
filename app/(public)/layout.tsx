import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/component/layout.component/header.component";
import Footer from "@/component/layout.component/footer.component";
import Sidebar from "@/component/layout.component/sidebar.component";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex h-screen flex-col bg-gray-50">
          <Header />

            <div className="flex min-h-0 flex-1 overflow-hidden">
              <Sidebar />

              <main className="min-w-0 flex-1 overflow-y-auto bg-white px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
                <div className="mb-4 md:hidden">
                  <SidebarTrigger />
                </div>
                {children}
              </main>
            </div>

            <Footer />
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}