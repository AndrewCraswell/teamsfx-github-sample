import ReactDOM from "react-dom";

import App from "./App";
import { FluentThemeAdapter } from "./FluentThemeAdapter";
import { TeamsFxProvider } from "./teamsfx";
import { IdentityType, TeamsFx } from "@microsoft/teamsfx";

import "./index.css";

// NOTE: By allowing the option to pass this instance into
//  the provider, you give the consumer the ability to define
//  it outside of the React render cycle. This allows it to be
//  used outside of the React code as well, such as referencing it
//  in Redux or MobX state management.
//
//  The same instance will be passed down to the useTeamsFx() hook.
//  Alternatively, by not passing it into the provider, a default
//  TeamsFx instance will be created and used instead.
export const teamsfx = new TeamsFx(IdentityType.User, {});

ReactDOM.render(
  <TeamsFxProvider teamsfx={teamsfx}>
    <FluentThemeAdapter>
      <App />
    </FluentThemeAdapter>
  </TeamsFxProvider>,
  document.getElementById("root")
);
