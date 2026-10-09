import { Container } from "./container";
import { PageHeader } from "./page-header";

/** Temporary page body for routes that are built in later phases. */
export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Container>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <p className="text-base text-fg-subtle">Esta sección está en construcción.</p>
    </Container>
  );
}
