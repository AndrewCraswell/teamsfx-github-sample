import { IdentityType, TeamsFx } from "@microsoft/teamsfx";
import { createContext, useContext } from "react";

export type TeamsFxContextValue = {
  teamsfx: TeamsFx;
};

const contextDefault: TeamsFxContextValue = {
  // TODO: Is this valid, or is the initialization promise based?
  //  Why was this being created in a useData() hook otherwise?
  teamsfx: new TeamsFx(IdentityType.User, {}),
};

export const TeamsFxContext = createContext(contextDefault);

export const useTeamsFxContext = () => useContext(TeamsFxContext);
