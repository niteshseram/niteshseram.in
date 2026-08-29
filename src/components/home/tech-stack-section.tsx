import { TechStackToolbench } from '@/components/tech-stack-toolbench';
import { ContentSection } from '@/components/ui/content-section';

export function TechStackSection() {
  return (
    <ContentSection ariaLabel="Tech stack" title="Tools I reach for">
      <TechStackToolbench />
    </ContentSection>
  );
}
