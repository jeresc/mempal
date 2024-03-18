import {Logo} from "@/assets/logo";
import {Nav} from "@/components/ui/nav";

function Header() {
  return (
    <header className="flex items-center justify-between py-4 text-xl font-bold leading-[4rem] backdrop-blur-md">
      <Logo className="h-8 text-[#202228]" />
      <Nav />
    </header>
  );
}

export {Header};
