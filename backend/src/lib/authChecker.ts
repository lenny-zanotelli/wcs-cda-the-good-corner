import { JWTContext } from "src";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<JWTContext> = ( 
  {context}, 
  roles
  ) => {
  if (context.user && roles.includes(context.user.role)) {
    return true;
  } else {
    return false;
  }
}