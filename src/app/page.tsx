import Link from "next/link";

import { taskPath } from "@/paths";

export default function Home() {
  return (
    <div>
      <div>Home</div>

      <div>
        <Link href={taskPath}>Task</Link>
      </div>
    </div>
  );
}
