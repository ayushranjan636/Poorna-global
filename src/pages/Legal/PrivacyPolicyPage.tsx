import {
  LegalHeading,
  LegalList,
  LegalPage,
  LegalText,
} from '../../components/ui/Legal';
import { usePageMeta } from '../../lib/usePageMeta';

export default function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy | Poorna Global Strategies',
    description:
      'How Poorna Global Strategies collects, uses, discloses and safeguards information provided through this website.',
  });

  return (
    <LegalPage
      title="Privacy Policy"
      intro="How we collect, use, disclose and safeguard information you provide when you visit this website or engage our services."
      otherDocument={{ label: 'View our Terms of Service', to: '/terms-of-service' }}
    >
      <LegalText>
        At Poorna Global Strategies, we take your privacy seriously. This policy explains how
        we handle your information. If you do not agree with it, please do not use this site.
      </LegalText>

      <LegalHeading>Information we collect</LegalHeading>
      <LegalText>We collect information that you provide to us directly, which may include:</LegalText>
      <LegalList
        items={[
          'Identification details such as your name, email address and telephone number',
          'Information about your organisation and the engagement you are enquiring about',
          'Correspondence you send to us',
        ]}
      />
      <LegalText>
        We may also collect limited technical information automatically when you visit the
        site, such as IP address, browser and device characteristics, operating system,
        language preferences, referring URLs and how the site is used. This does not reveal
        your identity.
      </LegalText>

      <LegalHeading>How we use your information</LegalHeading>
      <LegalList
        items={[
          'To respond to your enquiry and carry out agreed work',
          'To operate, maintain and improve this website and our services',
          'To understand how the site is used',
          'To communicate with you about an engagement or enquiry',
          'For compliance, fraud prevention and safety purposes',
        ]}
      />

      <LegalHeading>Disclosure of your information</LegalHeading>
      <LegalList
        items={[
          <>
            <strong className="font-medium text-[var(--color-ink)]">Service providers:</strong> we
            may share information with vendors and contractors who perform services on our
            behalf.
          </>,
          <>
            <strong className="font-medium text-[var(--color-ink)]">Business transfers:</strong> we
            may share or transfer information in connection with a merger, financing or
            acquisition of all or part of our business.
          </>,
          <>
            <strong className="font-medium text-[var(--color-ink)]">With your consent:</strong> we
            may disclose information for any other purpose with your agreement.
          </>,
          <>
            <strong className="font-medium text-[var(--color-ink)]">Legal obligations:</strong> we
            may disclose information where required by law or in response to valid requests by
            public authorities.
          </>,
        ]}
      />

      <LegalHeading>Security</LegalHeading>
      <LegalText>
        We use administrative, technical and physical measures to protect personal
        information. No security measure is perfect, however, and no transmission over the
        internet can be guaranteed to be completely secure.
      </LegalText>

      <LegalHeading>Your rights</LegalHeading>
      <LegalText>
        Depending on where you are located, you may have the right to access the personal
        information we hold about you, to have it corrected or deleted, to object to its
        processing, and to data portability. To exercise any of these rights, please contact
        us.
      </LegalText>

      <LegalHeading>Cookies</LegalHeading>
      <LegalText>
        We may use cookies and similar technologies to understand how this site is used. You
        can instruct your browser to refuse cookies or to notify you when one is set.
      </LegalText>

      <LegalHeading>Children's privacy</LegalHeading>
      <LegalText>
        Our services are not intended for individuals under the age of 18, and we do not
        knowingly collect personal information from them. If you believe a child has provided
        us with personal information, please contact us.
      </LegalText>

      <LegalHeading>Changes to this policy</LegalHeading>
      <LegalText>
        We may update this policy from time to time. Any changes will be posted on this page
        with a revised date above.
      </LegalText>
    </LegalPage>
  );
}
