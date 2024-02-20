// import { ReactNode } from "react";
// import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { decodeToken } from "../utils/verifyToken";
// import { Navigate } from "react-router-dom";
// import { JwtPayload } from "jwt-decode";


// type TProtectedRoute = {
//   children: ReactNode;
//   role: string | undefined;
// };

// const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
//   const token = useAppSelector(useCurrentToken);

//   let user;

//   if (token) {
//     user = decodeToken(token);
//   }

//   const dispatch = useAppDispatch();

//   if (role !== undefined && role !== user?.role as any) {
//     dispatch(logout());
//     return <Navigate to="/login" replace={true} />;
//   }
//   if (!token) {
//     return <Navigate to="/login" replace={true} />;
//   }

//   return children;
// };

// export default ProtectedRoute;
