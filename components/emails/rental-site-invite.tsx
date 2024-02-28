import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html, Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

type RentalSiteInviteEmailProps = {
  inviteUrl: string;
  name: string;
  logo: string;
  subdomain: string;
}

export const RentalSiteInviteEmail = ({
  inviteUrl,
  name,
  logo,
  subdomain
}: RentalSiteInviteEmailProps) => (
  <Html>
    <Head />
    <Preview>
      You're invited to join {name}, the #1 Party Rental service in the DMV.
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          <Text className="text-base">
            Hi there,
          </Text>
          <Text className="text-base">
            You have been invited to join the team at {name}, our exclusive rental site. Click the button below to accept your invitation and start managing the site:
          </Text>
          <Section className="my-5 text-center">
            <Button
              className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-base text-white no-underline"
              href={inviteUrl}
            >
              Accept Invitation
            </Button>
          </Section>
          <Hr className="my-4 border-t-2 border-gray-300" />
          <Text className="text-sm text-gray-600">
            If you have any questions, feel free to contact us at support@{subdomain}.com.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default RentalSiteInviteEmail;
