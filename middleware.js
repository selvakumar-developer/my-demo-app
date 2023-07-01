// This function can be marked `async` if using `await` inside
export function middleware(request) {}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
  api: {
    bodyParser: false,
  },
};
