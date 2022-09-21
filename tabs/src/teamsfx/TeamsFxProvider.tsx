import { useEffect, useMemo } from "react";
import {
  TeamsFx,
  LogFunction,
  LogLevel,
  setLogLevel,
  setLogFunction,
  IdentityType,
} from "@microsoft/teamsfx";

import { TeamsFxContext, TeamsFxContextValue } from "./TeamsFxContext";

export type TeamsFxProviderProps = {
  teamsfx?: TeamsFx;
  logger?: LogFunction;
};

// TODO: Pass in environment variables?

export const TeamsFxProvider: React.FunctionComponent<TeamsFxProviderProps> = ({
  children,
  teamsfx,
  logger,
}) => {
  const value = useMemo(
    (): TeamsFxContextValue => ({
      // TODO: Pass in the config as a prop? Review the TeamsFx
      //    code to understand what the config is used for
      teamsfx: teamsfx ?? new TeamsFx(IdentityType.User, {}),
    }),
    [teamsfx]
  );

  useEffect(() => {
    setLogLevel(LogLevel.Verbose);
    setLogFunction(logger);
  }, [logger]);

  return (
    <TeamsFxContext.Provider value={value}>{children}</TeamsFxContext.Provider>
  );
};
