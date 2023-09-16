import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>  
            <div className="flex ">
                <Sidebar />
                <main className="flex-1 p-10">{children}</main>
          </div>
      </section>
    )
  }