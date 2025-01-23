import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "auth(.*)", "portal(.*)"],
  ignoredRoutes: ["/chatbot"],
});

export const congfig = {
  matcher: [
    '/((?!.+.[w]+$|_next).*)','/',
    "/(api|trpc)(.*)",
  ],
};
