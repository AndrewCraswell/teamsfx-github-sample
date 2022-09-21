import React, { useMemo } from "react";
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-components";

import { useTeamsFx } from "./teamsfx";

export const FluentThemeAdapter: React.FunctionComponent = ({ children }) => {
  const { theme } = useTeamsFx();

  const fluentTheme = useMemo(() => {
    switch (theme) {
      case "dark":
        return teamsDarkTheme;
      case "contrast":
        return teamsHighContrastTheme;
      default:
        return teamsLightTheme;
    }
  }, [theme]);

  return <FluentProvider theme={fluentTheme}>{children}</FluentProvider>;
};
