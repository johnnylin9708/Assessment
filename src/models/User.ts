import moment from "moment";

// **** Variables **** //

// **** Types **** //

export interface User {
  userId: string;
  email: string;
  username?: string;
  password?: string;
  ps?: string;
  isActive?: boolean;
  avatar?: string;
}

// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  userId?: string,
  email?: string,
  username?: string,
  password?: string,
  ps?: string,
  isActive?: boolean,
  avatar?: string // id last cause usually set by db
): User {
  return {
    userId: userId ?? "",
    email: email ?? "",
    username: username ?? "",
    password: password ?? "",
    ps: ps ?? "",
    isActive: isActive ?? false,
    avatar: avatar ?? "",
    // created: created ? new Date(created) : new Date(),
  };
}

/**
 * Get user instance from object.
 */
// function from(param: object): IUser {
//   if (!isUser(param)) {
//     throw new Error(INVALID_CONSTRUCTOR_PARAM);
//   }
//   const p = param as IUser;
//   return new_(p.name, p.email, p.created, p.id);
// }

/**
 * See if the param meets criteria to be a user.
 */
// function isUser(arg: unknown): boolean {
//   return (
//     !!arg &&
//     typeof arg === "object" &&
//     "id" in arg &&
//     typeof arg.id === "number" &&
//     "email" in arg &&
//     typeof arg.email === "string" &&
//     "name" in arg &&
//     typeof arg.name === "string" &&
//     "created" in arg &&
//     moment(arg.created as string | Date).isValid()
//   );
// }

// **** Export default **** //

export default {
  new: new_,
  // from,
  // isUser,
} as const;
