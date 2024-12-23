import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as Styled from "./Styled";

function Auth({
  setIsAuthed,
}: {
  setIsAuthed: Dispatch<SetStateAction<boolean>>;
}) {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trueAccounts, setTrueAccounts] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    setTrueAccounts({
      "elshahawy807@gamil.com": "1234",
      "mahmoud@gamil.com": "0000",
    });
  }, []);

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    if (trueAccounts[email] == password) setIsAuthed(true);
  };

  const onSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTrueAccounts((prev) => ({ ...prev, [email]: password }));
    toggle(true);
    setEmail("");
    setPassword("");
  };

  return (<Styled.Page>
    <Styled.Container>
      <Styled.SignUpContainer signinIn={signIn}>
        <Styled.Form onSubmit={onSignup}>
          <Styled.Title>Create Account</Styled.Title>
          <Styled.Input type="text" placeholder="Name" />
          <Styled.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Styled.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Styled.Button>Sign Up</Styled.Button>
        </Styled.Form>
      </Styled.SignUpContainer>

      <Styled.SignInContainer signinIn={signIn}>
        <Styled.Form onSubmit={onLogin}>
          <Styled.Title>Sign in</Styled.Title>
          <Styled.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Styled.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Styled.Anchor href="#">Forgot your password?</Styled.Anchor>
          <Styled.Button>Sigin In</Styled.Button>
        </Styled.Form>
      </Styled.SignInContainer>

      <Styled.OverlayContainer signinIn={signIn}>
        <Styled.Overlay signinIn={signIn}>
          <Styled.LeftOverlayPanel signinIn={signIn}>
            <Styled.Title>Welcome Back!</Styled.Title>
            <Styled.Paragraph>
              To keep connected with us please login with your personal info
            </Styled.Paragraph>
            <Styled.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Styled.GhostButton>
          </Styled.LeftOverlayPanel>

          <Styled.RightOverlayPanel signinIn={signIn}>
            <Styled.Title>Hello, Friend!</Styled.Title>
            <Styled.Paragraph>
              Enter Your personal details and start journey with us
            </Styled.Paragraph>
            <Styled.GhostButton onClick={() => toggle(false)}>
              Sigin Up
            </Styled.GhostButton>
          </Styled.RightOverlayPanel>
        </Styled.Overlay>
      </Styled.OverlayContainer>
    </Styled.Container></Styled.Page>
  );
}

export default Auth;
