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
    DummnyData: "/dummny-data",
  },
  Connection: {
    Connect: "/connect",
    Query: "/connections/:userId",
  },
  Message: {
    Insert: "/message",
    Query: "/messages/:connectionId",
  },
} as const;
