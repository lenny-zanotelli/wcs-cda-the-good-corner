import { JWTContext } from "src";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<JWTContext> = ( 
  {context}, 
  roles
  ) => {
  if (roles.length > 0 && context.email) {
    if (roles.includes(context.role)) {
      return true
    } else {
      return false
    }
  }
  if (roles.length === 0 && context.email) {
    return true;
  }
  return false;
}