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
// import { Icons } from '../components/shared/icons';

type RentalSiteInviteEmailProps = {
  inviteUrl: string;
}

export const RentalSiteInviteEmail = ({
  inviteUrl
}: RentalSiteInviteEmailProps) => (
  <Html>
    <Head />
    <Preview>
      You're invited to join our exclusive rental site community.
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          {/* <Icons.logo className="m-auto block size-10" /> */}
          <Text className="text-base">
            Hi there,
          </Text>
          <Text className="text-base">
            You have been invited to join our exclusive rental site. Click the button below to accept your invitation:
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
            If you have any questions, feel free to contact us at support@rentalsite.com.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default RentalSiteInviteEmail;
