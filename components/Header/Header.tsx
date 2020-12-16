import { FC } from "react"
import Link from "next/link"

export const Header: FC = () => {
  return (
    <Link href="/">
      <a>What's Next?!</a>
    </Link>
  );
};
