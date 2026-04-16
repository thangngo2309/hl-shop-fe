import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-xl shadow-slate-200/60 backdrop-blur">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
          404
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Not Found
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Không tìm thấy trang bạn đang truy cập.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Trở về trang đăng nhập
        </Link>
      </div>
    </div>
  )
}