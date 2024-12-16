import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Button, Tailwind } from '@react-email/components';

interface WelcomeEmailProps {
  username: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ username }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 px-5">
          <Section className="mt-8">
            <Text className="text-3xl font-bold text-gray-800">Welcome to Our Platform, {username}!</Text>
            <Text className="text-lg text-gray-600 mt-4">
              We're excited to have you on board. Get started by exploring our features and setting up your profile.
            </Text>
            <Button
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded mt-6"
              href="https://example.com/get-started"
            >
              Get Started
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;

