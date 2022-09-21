import { CurrentUser } from "./CurrentUser";
import { Text, Image } from "@fluentui/react-components";

export default function App() {
  const environment =
    window.location.hostname === "localhost"
      ? "local environment"
      : "Azure environment";

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <Text align="center" block>
          Your app is running in your{" "}
          <Text weight="semibold">{environment}</Text>
        </Text>
        <CurrentUser />
      </div>
    </div>
  );
}
