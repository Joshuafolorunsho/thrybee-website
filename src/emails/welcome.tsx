import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  firstName: string;
  unsubscribeUrl: string;
  logoUrl: string;
}

export function WelcomeEmail({
  firstName,
  unsubscribeUrl,
  logoUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Thrybee early access</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={logoWrap}>
            <Img src={logoUrl} alt="Thrybee" width="64" style={brand} />
          </Section>
          <Section style={card}>
            <Heading as="h2" style={h2}>
              You&apos;re on the list, {firstName}.
            </Heading>
            <Text style={text}>
              Welcome to Thrybee early access. We&apos;ll be in touch the moment
              your invite is ready.
            </Text>
            <Text style={text}>Here&apos;s what to expect from us next:</Text>
            <ul style={list}>
              <li style={listItem}>First-look invites as we open the beta.</li>
              <li style={listItem}>
                Early signal on new matching and community features.
              </li>
              <li style={listItem}>
                Occasional notes — never noise. Your feedback shapes what ships.
              </li>
            </ul>
            <Text style={muted}>
              Have questions or want to talk mentorship? Reply to this email or
              reach us at{" "}
              <Link href="mailto:contact@thrybee.com" style={link}>
                contact@thrybee.com
              </Link>
              .
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Thrybee ·{" "}
            <Link href={unsubscribeUrl} style={footerLink}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  firstName: "Ada",
  unsubscribeUrl: "https://thrybee.com/api/early-access/unsubscribe?token=demo",
  logoUrl: "https://thrybee.com/logo.jpg",
} satisfies WelcomeEmailProps;

export default WelcomeEmail;

const body: React.CSSProperties = {
  backgroundColor: "#0f1115",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "32px 16px",
  maxWidth: "560px",
};

const logoWrap: React.CSSProperties = {
  textAlign: "center",
  margin: "0 0 16px",
};

const brand: React.CSSProperties = {
  display: "inline-block",
  borderRadius: "12px",
  height: "auto",
};

const card: React.CSSProperties = {
  backgroundColor: "#161922",
  border: "1px solid #2a2e3a",
  borderRadius: "16px",
  padding: "32px",
};

const h2: React.CSSProperties = {
  color: "#f6f5ef",
  fontSize: "24px",
  margin: "0 0 16px",
};

const text: React.CSSProperties = {
  color: "#cdd1dc",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "12px 0",
};

const list: React.CSSProperties = {
  color: "#cdd1dc",
  fontSize: "15px",
  lineHeight: "24px",
  paddingLeft: "20px",
  margin: "12px 0",
};

const listItem: React.CSSProperties = {
  margin: "6px 0",
};

const link: React.CSSProperties = {
  color: "#00bdf4",
  textDecoration: "underline",
};

const muted: React.CSSProperties = {
  color: "#9ea3b0",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "16px 0 0",
};

const hr: React.CSSProperties = {
  borderColor: "#2a2e3a",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  color: "#6b7080",
  fontSize: "12px",
  textAlign: "center",
};

const footerLink: React.CSSProperties = {
  color: "#00bdf4",
  textDecoration: "underline",
};
