import { Container, Eyebrow, Section } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { usePageMeta } from '../lib/usePageMeta';
import Logo from '../components/ui/Logo';

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page not found | Poorna Global Strategies',
    description: 'The page you were looking for could not be found.',
  });

  return (
    <Section className="hero-wash pt-40" spacing="loose">
      <Container width="narrow">
        <Logo variant="mark" tone="dark" height={44} priority className="mb-8" />
        <Eyebrow>404</Eyebrow>
        <h1 className="display-lg mt-6">We could not find that page</h1>
        <p className="lead mt-5">
          The link may be out of date or mistyped. These are the places people usually mean.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/" size="lg" withArrow>
            Back to home
          </Button>
          <Button to="/projects" variant="secondary" size="lg">
            Selected projects
          </Button>
          <Button to="/contact" variant="secondary" size="lg">
            Contact
          </Button>
        </div>
      </Container>
    </Section>
  );
}
