/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Users: {
    Base: "/users",
    Register: "/register",
    ChangePsw: "/change-password",
    Login: "/login",
    ValidateRefreshToken: "/validate-refresh-token",
    DummyData: "/dummny-data",
  },
} as const;
