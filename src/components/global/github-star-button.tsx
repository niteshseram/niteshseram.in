import { PiGithubLogo } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

export function GitHubStarButton() {
  return (
    <Button
      tooltip="Link to source code"
      addonPosition="start"
      icon={PiGithubLogo}
      label="Link to source code"
      className="group"
      iconClassName="group-hover:animate-wiggle"
      isLabelHidden={true}
      href="https://github.com/niteshseram/niteshseram.in"
      variant="tertiary"
    />
  );
}
