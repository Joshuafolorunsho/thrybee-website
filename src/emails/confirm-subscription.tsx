import {
  Body,
  Button,
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

interface ConfirmSubscriptionEmailProps {
  firstName: string;
  confirmUrl: string;
  unsubscribeUrl: string;
  logoUrl: string;
}

export function ConfirmSubscriptionEmail({
  firstName,
  confirmUrl,
  unsubscribeUrl,
  logoUrl,
}: ConfirmSubscriptionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your early access to Thrybee</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={logoWrap}>
            <Img src={logoUrl} alt="Thrybee" width="64" style={brand} />
          </Section>
          <Section style={card}>
            <Heading as="h2" style={h2}>
              Confirm your email
            </Heading>
            <Text style={text}>Hi {firstName},</Text>
            <Text style={text}>
              You&apos;re one tap away from joining the Thrybee early access
              community — a trusted network of mentors and mentees built around
              intelligent matching.
            </Text>
            <Text style={text}>
              Confirm your email so we can let you know the moment you&apos;re
              in.
            </Text>
            <Section style={{ textAlign: "center", margin: "32px 0" }}>
              <Button href={confirmUrl} style={button}>
                Confirm my email
              </Button>
            </Section>
            <Text style={muted}>
              This link expires in 7 days. If you didn&apos;t sign up, you can
              safely ignore this email.
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

ConfirmSubscriptionEmail.PreviewProps = {
  firstName: "Ada",
  confirmUrl: "https://thrybee.com/api/early-access/confirm?token=demo",
  unsubscribeUrl: "https://thrybee.com/api/early-access/unsubscribe?token=demo",
  logoUrl: "https://thrybee.com/logo.jpg",
} satisfies ConfirmSubscriptionEmailProps;

export default ConfirmSubscriptionEmail;

const body: React.CSSProperties = {
  backgroundColor: "#0f1115",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: 0,
  color: "#f6f5ef",
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
  color: "#f6f5ef",
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

const button: React.CSSProperties = {
  backgroundColor: "#00bdf4",
  color: "#0f1115",
  borderRadius: "999px",
  padding: "14px 28px",
  fontWeight: 600,
  fontSize: "15px",
  textDecoration: "none",
  display: "inline-block",
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
