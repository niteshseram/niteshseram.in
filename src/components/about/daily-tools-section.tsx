import { TechStackToolbench } from '@/components/tech-stack-toolbench';
import { ContentSection } from '@/components/ui/content-section';

export function DailyToolsSection() {
  return (
    <ContentSection ariaLabel="Daily tools" title="Daily tools">
      <TechStackToolbench label="daily-tools.config" />
    </ContentSection>
  );
}
