import { useId, useState } from 'react';
import axios from 'axios';
import { Container, Eyebrow, Section } from '../../components/ui/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button, TextLink } from '../../components/ui/Button';
import { useReveal } from '../../components/ui/useReveal';
import { company } from '../../content/site';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * ContactPage
 *
 * Submission behaviour, in order of preference:
 *   1. POST to VITE_CONTACT_ENDPOINT when configured.
 *   2. Otherwise open the visitor's mail client via VITE_CONTACT_EMAIL.
 *   3. If neither is configured, the form is disabled and we say so, and point
 *      to LinkedIn instead.
 *
 * Success is only ever reported when a submission genuinely succeeded. The
 * previous implementation POSTed to a route that does not exist; because the
 * SPA rewrite returns index.html with a 200, it reported success every time.
 * We now verify the response is actually JSON before trusting it.
 * ------------------------------------------------------------------------- */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'sent'; message: string }
  | { state: 'error'; message: string };

type Fields = { name: string; email: string; organisation: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';

  if (!values.email.trim()) errors.email = 'Please enter an email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!values.message.trim()) errors.message = 'Please tell us a little about your project.';
  else if (values.message.trim().length < 20)
    errors.message = 'A sentence or two of context helps us respond usefully.';

  return errors;
}

/* --- Field ---------------------------------------------------------------- */

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  rows,
  required = false,
  autoComplete,
  hint,
}: {
  label: string;
  name: keyof Fields;
  value: string;
  error?: string;
  onChange: (name: keyof Fields, value: string) => void;
  type?: string;
  rows?: number;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const shared = {
    id,
    name,
    value,
    required,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [error ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(' ') || undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(name, event.target.value),
    className: [
      'mt-2 w-full rounded-[var(--radius-sm)] border bg-white px-3.5 py-2.5 text-[0.9375rem]',
      'text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60',
      'transition-colors duration-200 outline-none',
      error
        ? 'border-[#a8372f] focus:border-[#a8372f]'
        : 'border-[var(--color-line-strong)] focus:border-[var(--color-accent)]',
    ].join(' '),
  };

  return (
    <div>
      <label htmlFor={id} className="text-[0.875rem] font-medium text-[var(--color-ink)]">
        {label}
        {!required && <span className="ml-1.5 font-normal text-[var(--color-muted)]">(optional)</span>}
      </label>

      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} />}

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-[var(--color-muted)]">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-[#a8372f]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export default function ContactPage() {
  usePageMeta({
    title: 'Contact | Poorna Global Strategies',
    description:
      'Start a conversation with Poorna Global Strategies about a project, market entry, policy programme or partnership.',
  });

  const [values, setValues] = useState<Fields>({
    name: '',
    email: '',
    organisation: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const configured = Boolean(ENDPOINT || EMAIL);
  const reveal = useReveal<HTMLDivElement>();

  const update = (name: keyof Fields, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ state: 'error', message: 'Please correct the highlighted fields.' });
      return;
    }

    /* Route 1 — a configured backend endpoint. */
    if (ENDPOINT) {
      setStatus({ state: 'submitting' });

      try {
        const response = await axios.post(ENDPOINT, values, {
          headers: { 'Content-Type': 'application/json' },
        });

        /* An SPA rewrite can return index.html with a 200. Only treat the
           submission as delivered if the endpoint answered with JSON. */
        const contentType = String(response.headers['content-type'] ?? '');
        if (!contentType.includes('application/json')) {
          throw new Error('Unexpected response from the contact endpoint.');
        }

        setStatus({
          state: 'sent',
          message: 'Thank you — your message has been sent. We will come back to you shortly.',
        });
        setValues({ name: '', email: '', organisation: '', message: '' });
      } catch {
        setStatus({
          state: 'error',
          message: EMAIL
            ? `We could not send that message. Please email us directly at ${EMAIL}.`
            : 'We could not send that message. Please try again, or reach us on LinkedIn.',
        });
      }
      return;
    }

    /* Route 2 — hand off to the visitor's mail client. */
    if (EMAIL) {
      const subject = `Project enquiry — ${values.name}`;
      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.organisation ? `Organisation: ${values.organisation}` : null,
        '',
        values.message,
      ]
        .filter((line) => line !== null)
        .join('\n');

      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      setStatus({
        state: 'sent',
        message:
          'Your email client should now be open with this message ready to send. If it did not open, please copy the details across manually.',
      });
    }
  };

  const submitting = status.state === 'submitting';

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation"
        intro="Tell us what you are trying to build, enter or reform. If we are the right people to help, we will say so — and if we are not, we will tell you that too."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
            {/* Form */}
            <div ref={reveal.ref} style={reveal.style} className={reveal.className}>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    name="name"
                    value={values.name}
                    error={errors.name}
                    onChange={update}
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={update}
                    required
                    autoComplete="email"
                  />
                </div>

                <Field
                  label="Organisation"
                  name="organisation"
                  value={values.organisation}
                  error={errors.organisation}
                  onChange={update}
                  autoComplete="organization"
                />

                <Field
                  label="About your project"
                  name="message"
                  value={values.message}
                  error={errors.message}
                  onChange={update}
                  rows={6}
                  required
                  hint="The sector, the stage it is at, and what is currently in the way."
                />

                {/* Live region — announces success and failure to screen readers. */}
                <div aria-live="polite" className="min-h-0">
                  {(status.state === 'sent' || status.state === 'error') && (
                    <p
                      className={[
                        'rounded-[var(--radius-sm)] border px-4 py-3 text-[0.9375rem]',
                        status.state === 'sent'
                          ? 'border-[var(--color-sage-deep)] bg-[var(--color-mist)] text-[var(--color-ink)]'
                          : 'border-[#e4c4c0] bg-[#fdf6f5] text-[#8f2f27]',
                      ].join(' ')}
                    >
                      {status.message}
                    </p>
                  )}
                </div>

                {configured ? (
                  <Button type="submit" size="lg" disabled={submitting} withArrow={!submitting}>
                    {submitting ? 'Sending…' : 'Send message'}
                  </Button>
                ) : (
                  /* No submission route is configured in this environment. We say
                     so plainly rather than pretending the message was sent. */
                  <div className="rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-mist)] px-4 py-4">
                    <p className="text-[0.9375rem] text-[var(--color-ink)]">
                      This form is not yet connected to a mailbox.
                    </p>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--color-muted)]">
                      Set <code className="text-[var(--color-ink)]">VITE_CONTACT_EMAIL</code> or{' '}
                      <code className="text-[var(--color-ink)]">VITE_CONTACT_ENDPOINT</code> to
                      enable it. In the meantime, please reach us on LinkedIn.
                    </p>
                    <div className="mt-3">
                      <TextLink href={company.linkedin}>Message us on LinkedIn</TextLink>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Aside */}
            <aside className="lg:pl-4">
              <div className="rounded-[var(--radius-md)] bg-[var(--color-mist)] p-7">
                <Eyebrow>What happens next</Eyebrow>
                <ol className="mt-5 space-y-5">
                  {[
                    'We read your note and come back to you directly — not through a sequence of automated emails.',
                    'If it looks like a fit, we arrange a call to understand the objective and the constraints.',
                    'We set out how we would approach it, what it would involve, and who from our team would be on it.',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3.5">
                      <span className="numeric mt-0.5 text-[0.8125rem] font-medium text-[var(--color-accent)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-[var(--color-ink-soft)]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7 border-t border-[var(--color-line-strong)] pt-7">
                <h2 className="heading-sm">Elsewhere</h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                  Our directors publish engagement notes and project updates on LinkedIn.
                </p>
                <div className="mt-4">
                  <TextLink href={company.linkedin}>{company.name} on LinkedIn</TextLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
