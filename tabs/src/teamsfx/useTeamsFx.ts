import { useCallback, useEffect, useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { app, pages } from "@microsoft/teams-js";
import { TeamsFx } from "@microsoft/teamsfx";

import { useTeamsFxContext } from "./TeamsFxContext";

const _DEFAULT_THEME = "default";

const getTheme = (): string => {
  // Verify that this is not executed in SSR environment
  if (typeof window === "undefined") {
    return _DEFAULT_THEME;
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("theme") ?? _DEFAULT_THEME;
};

export type UseTeamsFxReturn = {
  teamsfx: TeamsFx;
  isTeams?: boolean;
  isFullScreen?: boolean;
  theme: string;
  context?: app.Context;
  setTheme: (theme: string) => void;
};

export type UseTeamsFxOptions = {
  themeChangeHandler?: (theme?: string) => void;
};

export function useTeamsFx(options?: UseTeamsFxOptions): UseTeamsFxReturn {
  const { teamsfx } = useTeamsFxContext();
  const [isTeams, setIsTeams] = useState<boolean | undefined>(undefined);
  const [isFullScreen, setIsFullScreen] = useState<boolean | undefined>(
    undefined
  );
  const [theme, setTheme] = useState(getTheme());
  const [context, setContext] = useState<app.Context | undefined>(undefined);

  const themeChangeHandler = useCallback(
    (theme: string = _DEFAULT_THEME) => {
      if (options?.themeChangeHandler) {
        options.themeChangeHandler(theme);
      } else {
        setTheme(theme);
      }
    },
    [options]
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        await app.initialize();

        try {
          const context = await app.getContext();

          unstable_batchedUpdates(() => {
            setIsTeams(true);
            setContext(context);
            setIsFullScreen(context.page.isFullScreen);
          });

          themeChangeHandler(context.app.theme);
          app.registerOnThemeChangeHandler(themeChangeHandler);

          pages.registerFullScreenHandler((isFullScreen) => {
            setIsFullScreen(isFullScreen);
          });
        } catch (e) {
          setIsTeams(false);
        }
      } catch (e) {
        setIsTeams(false);
      }
    };

    // Set initial theme based on options or query string
    themeChangeHandler(theme);

    // Initialize the Teams SDK and load the context
    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeChangeHandler]);

  return useMemo(
    (): UseTeamsFxReturn => ({
      teamsfx,
      isTeams,
      isFullScreen,
      theme,
      context,
      setTheme,
    }),
    [context, isFullScreen, isTeams, teamsfx, theme]
  );
}
