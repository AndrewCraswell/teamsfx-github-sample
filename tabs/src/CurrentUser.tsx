import { UserInfo } from "@microsoft/teamsfx";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Subtitle2,
  Title3,
} from "@fluentui/react-components";
import {
  Card,
  CardHeader,
  TextareaField,
} from "@fluentui/react-components/unstable";

import { useTeamsFx } from "./teamsfx";

// Problems:
//  - TokenCredential type is not being exported from the @microsoft/teamsfx package, which makes
//    it difficult for consumers to type things correctly.
//  - AccessToken is not being exported from @microsoft/teamsfx package either
//  - getUserInfo() is asynchronous, and should just be handled in the TeamsFxProvider

export function CurrentUser() {
  const { teamsfx } = useTeamsFx();
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  // TODO: User info should come from the useTeamsFx() hook
  useEffect(() => {
    const fetchUser = async () => {
      const user = await teamsfx.getUserInfo();

      console.log("UserInfo", user);
      setUser(user);
    };

    fetchUser();
  }, [teamsfx]);

  // TODO: credential and token should come from the useTeamsFx() hook
  useEffect(() => {
    const fetchToken = async () => {
      const cred = teamsfx.getCredential();
      const token = await cred.getToken([]);

      console.log("Credential", cred);
      setToken(token?.token);
    };

    fetchToken();
  }, [teamsfx]);

  return (
    <>
      <Title3 as="h2" block>
        Current user
      </Title3>

      {user?.displayName && (
        <>
          <Card
            size="small"
            orientation="horizontal"
            style={{ maxWidth: 350, width: "100%" }}
          >
            <CardHeader
              image={<Avatar badge={{ status: "available" }} />}
              header={
                <Body1>
                  <b>{user.displayName}</b>
                </Body1>
              }
              description={<Caption1>{user.preferredUserName}</Caption1>}
              action={<Button appearance="transparent" />}
            />
          </Card>
        </>
      )}

      <>
        <Subtitle2 block as="h2">
          SSO Token
        </Subtitle2>
        <TextareaField
          readOnly
          className="token-input"
          value={token || "Empty SSO token"}
        />
      </>
    </>
  );
}
