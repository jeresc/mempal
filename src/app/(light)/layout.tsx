import {ThemeWrapper} from "~/theme/theme-wrapper";

export default function LightLayout({children}: {children: React.ReactNode}) {
  return <ThemeWrapper theme='light'>{children}</ThemeWrapper>;
}
