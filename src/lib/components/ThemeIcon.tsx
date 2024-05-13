import { Icon } from "@iconify/react";

export default function ThemeIcon({
  theme,
  darkIconClass,
  lightIconClass
}: {
  theme?: string;
  darkIconClass: string;
  lightIconClass: string;
}) {
  if (theme === 'dark') {
    return (
      <Icon
        icon="tabler:moon-filled"
        className={`${darkIconClass} absolute inset-y-0 right-[6px] m-[auto_0] text-black`}
      />
    );
  } else {
    return (
      <Icon
        icon="tabler:sun-filled"
        className={`${lightIconClass} absolute inset-y-0 left-1 m-[auto_0] text-white`}
      />
    );
  }
}