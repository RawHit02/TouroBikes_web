// "use Client";

// import { useEffect } from "react";
// import { useRouter } from "next/router";

// const withAuth = (WrappedComponent: React.ComponentType) => {
//   return (props: any) => {
//     const router = useRouter();

//     useEffect(() => {
//       const authToken = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("authToken="))
//         ?.split("=")[1];

//       if (!authToken) {
//         router.push("/"); // Redirect to login if no token
//       }
//     }, []);

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
