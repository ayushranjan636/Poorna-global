import {
  LegalHeading,
  LegalList,
  LegalPage,
  LegalText,
} from '../../components/ui/Legal';
import { usePageMeta } from '../../lib/usePageMeta';

export default function TermsOfServicePage() {
  usePageMeta({
    title: 'Terms of Service | Poorna Global Strategies',
    description:
      'The terms on which Poorna Global Strategies makes this website and its advisory services available.',
  });

  return (
    <LegalPage
      title="Terms of Service"
      intro="The terms on which we make this website and our advisory services available. Please read them before using the site."
      otherDocument={{ label: 'View our Privacy Policy', to: '/privacy-policy' }}
    >
      <LegalText>
        These Terms of Service govern your use of this website and the advisory services
        operated by Poorna Global Strategies Pvt Ltd ("we", "us", "our"). By accessing or
        using the site, you agree to be bound by these terms. If you disagree with any part
        of them, please do not use the site.
      </LegalText>

      <LegalHeading>1. Use of the site and our services</LegalHeading>
      <LegalText>
        This site and our services are made available for your business or professional use,
        subject to these terms. You agree to use them only for lawful purposes.
      </LegalText>

      <LegalHeading>2. Information is general, not advice</LegalHeading>
      <LegalText>
        Material published on this site is provided for general information only and does not
        constitute advice on which you should rely. Advisory services are delivered under a
        separate written engagement agreement, and only that agreement governs the work we do
        for you.
      </LegalText>
      <LegalText>
        Information published here is drawn from sources we believe to be reliable, but we do
        not warrant its accuracy or completeness. Market, regulatory and policy conditions
        change, which can affect the relevance of anything published.
      </LegalText>

      <LegalHeading>3. Intellectual property</LegalHeading>
      <LegalText>
        The site and its original content, features and functionality remain the property of
        Poorna Global Strategies Pvt Ltd and its licensors, protected by copyright, trademark
        and other applicable laws. Our names, marks and trade dress may not be used in
        connection with any product or service without our prior written consent.
      </LegalText>
      <LegalText>
        Photographs of third parties, press clippings and partner logos appearing on this site
        remain the property of their respective owners and are shown for identification and
        reference only.
      </LegalText>

      <LegalHeading>4. Material you send us</LegalHeading>
      <LegalText>
        You are responsible for any information you submit through this site, including its
        legality and accuracy. Please do not send confidential or privileged material through
        the contact form; if the matter is sensitive, tell us and we will agree a secure route
        first.
      </LegalText>

      <LegalHeading>5. Third-party links</LegalHeading>
      <LegalText>
        This site links to external material, including posts published on LinkedIn and the
        websites of our partner organisations. We do not control that content and are not
        responsible for it.
      </LegalText>

      <LegalHeading>6. Limitation of liability</LegalHeading>
      <LegalText>
        To the extent permitted by law, neither Poorna Global Strategies Pvt Ltd nor its
        directors, employees, partners, agents or suppliers will be liable for any indirect,
        incidental, special, consequential or punitive loss — including loss of profit, data,
        use or goodwill — arising from:
      </LegalText>
      <LegalList
        items={[
          'your access to, use of, or inability to use this site;',
          'any conduct or content of a third party on or linked from the site;',
          'any content obtained from the site; and',
          'unauthorised access to or alteration of your transmissions or content.',
        ]}
      />

      <LegalHeading>7. Availability</LegalHeading>
      <LegalText>
        We may change, suspend or withdraw access to the site at any time without notice. We
        do not warrant that the site will be available uninterrupted or free of error.
      </LegalText>

      <LegalHeading>8. Changes to these terms</LegalHeading>
      <LegalText>
        We may modify or replace these terms at any time. Where a change is material, we will
        seek to post notice in advance of it taking effect. Continuing to use the site after a
        change takes effect means you accept the revised terms.
      </LegalText>

      <LegalHeading>9. Governing law</LegalHeading>
      <LegalText>
        Poorna Global Strategies Pvt Ltd is incorporated in India, and these terms are
        governed by the laws applicable to its place of incorporation. Where an engagement
        agreement specifies a governing law or dispute resolution forum, that agreement takes
        precedence over this clause for the work it covers.
      </LegalText>
      <LegalText>
        Our failure to enforce any provision of these terms is not a waiver of it. If any
        provision is held invalid or unenforceable, the remainder continues in effect.
      </LegalText>
    </LegalPage>
  );
}
