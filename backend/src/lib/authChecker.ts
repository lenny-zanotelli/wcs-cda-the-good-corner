import { JWTContext } from "src";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<JWTContext> = ( 
  {context}, 
  roles
  ) => {
    if (context.user) {
      // if an user is connected
      // we verify if user has the good role and if roles are present 
      if (roles.length > 0) {
        if (roles.includes(context.user.role)) {
          return true; // let it pass
        } else {
          return false; // block
        }
      }
      return true; // if user is connected when Authorized is prensentm, we let it pass
    }
    return false; // if user is not connected when Auhtorized Decorator is present, we block
}
