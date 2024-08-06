import {logout} from "~/auth/actions/logout";

interface LogoutButtonProps {
  children: React.ReactNode;
}

function LogoutButton({children}: LogoutButtonProps) {
  const onClick = () => {
    logout();
  };

  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  );
}

export {LogoutButton};
